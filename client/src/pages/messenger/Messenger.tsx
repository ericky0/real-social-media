import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation'
import { Conversation as ConversationType } from '../../types/Conversation'
import { Message as MessageType} from '../../types/Message'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import './messenger.scss'
import api from '../../services/api'
import { io } from 'socket.io-client'
import { User } from '../../types/User'

export default function Messenger() {
  const [conversations, setConversations] = useState<ConversationType[]>([])
  const [currentChat, setCurrentChat] = useState<ConversationType | null>(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [newMessage, setNewMessage] = useState<string>("")
  const [arrivalMessage, setArrivalMessage] = useState<MessageType>()
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  const socket = useRef<any>()
  const { user } = useContext(AuthContext)
  // console.log(user)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    socket.current = io("ws://localhost:8900")
    socket.current.on('getMessage', (data: any) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage && currentChat?.members?.includes(arrivalMessage.sender!) &&
    setMessages(prev => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit("addUser", user._id)
    socket.current.on("getUsers", (users: { userId: string; socketId: string }[]) => {
      setOnlineUsers(user.followings.filter((f: string) => users.some((u) => u.userId === f)))
    })
  }, [user])
  
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await api.get('/conversations/'+user?._id)
        setConversations(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConversations()
  }, [user?._id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await api.get('/messages/' + currentChat?._id)
        setMessages(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getMessages()
  }, [currentChat])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat?._id,
    }

    const receiverId = currentChat?.members?.find(member => member !== user._id)

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage
    })

    try {
      const res = await api.post('/messages', message)
      setMessages([...messages, res.data])
      setNewMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  return (
    <>
    <Topbar />
    <div className='messenger'>
      <div className="chatMenu">
        <div>
          <input type="text" placeholder='Search for friends' />
          {conversations.map((c) => (
            <div key={c._id} onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} currentUser={user}/>
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div>{ currentChat ? <>
          <div className="boxTop">
            {messages.map(m => (
              <div key={m.createdAt?.toString()} ref={scrollRef}>
                <Message message={m} own={m.sender === user._id}/>
              </div>
            ))}
          </div>
          <div className="boxBottom">
            <textarea 
              placeholder='write something ...'
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              ></textarea>
            <button onClick={handleSubmit}>Send</button>
          </div> </> : <span className='noConversation'>Open a conversation to start a chat</span> }
        </div>
      </div>
      <div className="chatOnline">
        <div>
          <ChatOnline 
            onlineUsers={onlineUsers} 
            currentId={user._id} 
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </div>
    </>
    
  )
}
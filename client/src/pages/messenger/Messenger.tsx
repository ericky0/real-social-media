import { useContext, useEffect, useState } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation'
import { Conversation as ConversationType } from '../../types/Conversation'
import { Message as MessageType} from '../../types/Message'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import './messenger.scss'
import api from '../../services/api'

export default function Messenger() {
  const [conversations, setConversations] = useState<ConversationType[]>([])
  const [currentChat, setCurrentChat] = useState<ConversationType | null>(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const {user} = useContext<any>(AuthContext)
  
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
              <Message message={m} own={m.sender === user._id}/>
            ))}
          </div>
          <div className="boxBottom">
            <textarea placeholder='write something ...'></textarea>
            <button>Send</button>
          </div> </> : <span className='noConversation'>Open a conversation to start a chat</span> }
        </div>
      </div>
      <div className="chatOnline">
        <div>
          <ChatOnline />
        </div>
      </div>
    </div>
    </>
    
  )
}
import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Conversation as ConversationType } from '../../types/Conversation'
import { User } from '../../types/User'
import './conversation.scss'

type ConversationProps = {
  conversation: ConversationType
  currentUser: User
}

export default function Conversation({conversation, currentUser}: ConversationProps) {
  const [user,setUser] = useState<User | null>(null)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const friendId = conversation.members?.find(member => member !== currentUser._id)
    
    const getUser = async () => {
      try{
        const res = await api.get('/users?userid=' + friendId)
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [currentUser, conversation])

  return(
    <div className='conversation'>
      <img src={user?.profilePicture ? PF + user?.profilePicture : PF + 'person/noAvatar.png'} alt="person"/>
      <span>{user?.username}</span>
    </div>
  )
}
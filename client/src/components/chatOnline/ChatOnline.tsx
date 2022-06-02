import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Conversation } from '../../types/Conversation'
import { User } from '../../types/User'
import './chatOnline.scss'

type ChatOnlineProps = {
  onlineUsers?: any[]
  currentId?: string
  setCurrentChat: React.Dispatch<React.SetStateAction<Conversation | null>>
}

type Friend = {
  _id?: string
  username?: string
  profilePicture?: string
}

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}: ChatOnlineProps) {
  
  const [friends, setFriends] = useState<Friend[]>([])
  const [onlineFriends, setOnlineFriends] = useState<User[]>([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const getFriends = async () => {
      const res = await api.get('/users/friends/' + currentId)
      setFriends(res.data)
    }

    getFriends()
    
  }, [currentId])

  useEffect(() => {
    setOnlineFriends(friends.filter(f => onlineUsers?.includes(f._id)))
  }, [onlineUsers, friends])

  const handleClick = async (user: User) => {
    try {
      const res = await api.get(`/conversations/${currentId}/${user._id}`)
      setCurrentChat(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="classOnline">
      {onlineFriends.map((online) => (
        <div className="friend" key={online._id} onClick={() =>
          handleClick(online)
        }>
          <div className="imgContainer">
            <img src={online?.profilePicture ? PF! + online?.profilePicture : PF! + 'person/noAvatar.png'} alt="person"/>
            <div className="badge"></div>
          </div>
          <span>{online.username}</span>
        </div>
      ))}
    </div>
  )
}
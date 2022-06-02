import { Message as MessageType } from '../../types/Message';
import { format } from 'timeago.js'
import './message.scss'
import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import api from '../../services/api';

type MessageProps = {
  own?: boolean;
  message?: MessageType
}

export default function Message({own, message}: MessageProps) {
  const [ user, setUser ] = useState<User>()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    const getUser = async () => {
      const res = await api.get('/users?userid=' + message?.sender)
      setUser(res.data)
    }
    getUser()
  }, [message?.sender])

  return(
    <div className={own ? "message own" : "message"}>
      <div className="top">
        <img src={user?.profilePicture ? PF! + user?.profilePicture : PF! + 'person/noAvatar.png'} alt="person"/>
        <p> {message?.text} </p>
      </div>
      <div className="bottom">
        {format(message?.createdAt!)}
      </div>
    </div>
  )
}
import { Message as MessageType } from '../../types/Message';
import { format } from 'timeago.js'
import './message.scss'

type MessageProps = {
  own?: boolean;
  message?: MessageType
}

export default function Message({own, message}: MessageProps) {
  return(
    <div className={own ? "message own" : "message"}>
      <div className="top">
        <img src="https://images.pexels.com/photos/11855703/pexels-photo-11855703.jpeg?cs=srgb&dl=pexels-roman-polenin-11855703.jpg&fm=jpg" alt="person"/>
        <p> {message?.text} </p>
      </div>
      <div className="bottom">
        {format(message?.createdAt!)}
      </div>
    </div>
  )
}
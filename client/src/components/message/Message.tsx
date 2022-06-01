import './message.scss'

type MessageProps = {
  own?: boolean;
}

export default function Message({own}: MessageProps) {
  return(
    <div className={own ? "message own" : "message"}>
      <div className="top">
        <img src="https://images.pexels.com/photos/11855703/pexels-photo-11855703.jpeg?cs=srgb&dl=pexels-roman-polenin-11855703.jpg&fm=jpg" alt="person"/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      </div>
      <div className="bottom">
        1 hour ago
      </div>
    </div>
  )
}
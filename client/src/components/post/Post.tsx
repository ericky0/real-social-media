import "./post.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Users } from '../../dummyData'
import { useState } from "react";

type postProp = {
  desc?: string;
  photo?: string;
  date: string;
  userId: number;
  like: number;
  comment: number;
}

export default function Post({desc, photo, date, userId, like, comment}: postProp) {
  
  const [likeCount, setLikeCount] = useState(like)
  const [isLiked, setIsLiked] = useState(false)

  const likeHandler = () => {
    setLikeCount(!isLiked ? likeCount + 1 : likeCount - 1)
    setIsLiked(!isLiked)
  }


  return (
    <div className="post">
      <div className="postWrapper">
        <div className="top">
          <div className="topLeft">
            <img src={Users.filter((u) => u.id === userId)[0].profilePicture} alt="person" />
            <span className="username">{Users.filter((u) => u.id === userId)[0].username}</span>
            <span className="date">{date}</span>
          </div>
          <div className="topRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="center">
          <span>
            {desc}
          </span>
          <img src={photo} alt="post" />
        </div>
        <div className="bottom">
          <div className="bottomLeft">
            <img src="/assets/like.png" onClick={likeHandler} alt="like"/>
            <img src="/assets/heart.png" onClick={likeHandler} alt="heart" />
            <span>{likeCount} people liked it</span>
          </div>
          <div className="bottomRight">
            <span>{comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
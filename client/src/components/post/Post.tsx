import "./post.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import api from "../../services/api";
import { format } from 'timeago.js'
import { Link } from "react-router-dom";

type postProp = {
  desc?: string;
  photo?: string;
  date: Date;
  userId: string;
  like: [];
  comment: number;
}

type IUser = {
  profilePicture?: string;
  username: string;
}

export default function Post({desc, photo, date, userId, like, comment}: postProp) {
  
  const [user, setUser] = useState<IUser>()
  useEffect(() => {
    const fetchUser = async () => {
      const res = await api.get(`users/${userId}`) 
      setUser(res.data)
    }
    fetchUser()
  }, [userId])

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [likeCount, setLikeCount] = useState(like.length)
  const [isLiked, setIsLiked] = useState(false)

  const likeHandler = () => {
    //@ts-expect-error
    setLikeCount(!isLiked ? likeCount + 1 : likeCount - 1)
    setIsLiked(!isLiked)
  }


  return (
    <div className="post">
      <div className="postWrapper">
        <div className="top">
          <div className="topLeft">
            <Link to={`profile/${user?.username}`} > 
              <img src={user?.profilePicture ? PF + user?.profilePicture : PF! + 'person/noAvatar.png'} alt="person" />
            </Link>
            <span className="username">{user?.username}</span>
            <span className="date">{format(date)}</span>
          </div>
          <div className="topRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="center">
          <span>
            {desc}
          </span>
          <img src={PF! + photo} alt="post" />
        </div>
        <div className="bottom">
          <div className="bottomLeft">
            <img src={`${PF}like.png` } onClick={likeHandler} alt="like"/>
            <img src={`${PF}heart.png` } onClick={likeHandler} alt="heart" />
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
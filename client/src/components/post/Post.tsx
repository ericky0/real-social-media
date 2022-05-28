import "./post.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { format } from 'timeago.js'
import { Link } from "react-router-dom";

import { Post as PostType } from '../../types/Post'
import { User } from "../../types/User";
import { AuthContext } from "../../context/AuthContext";

export default function Post({desc, img, createdAt, userId, likes, comments, _id}: PostType) {
  
  const [user, setUser] = useState<User>()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [likeCount, setLikeCount] = useState(likes?.length!)
  const [isLiked, setIsLiked] = useState(false)
  const { user: currentUser } = useContext(AuthContext)


  useEffect(() => {
    setIsLiked(likes!.includes(currentUser._id));
  }, [currentUser._id, likes])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await api.get(`users?userid=${userId}`) 
      setUser(res.data)
    }
    fetchUser()
  }, [userId])


  const likeHandler = async () => {
    try {
      await api.put(`/posts/${_id}/like`, {userId: currentUser._id})
    } catch (err) {
      
    }
    setLikeCount(!isLiked ? likeCount! + 1 : likeCount! - 1)
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
            <span className="date">{format(createdAt!)}</span>
          </div>
          <div className="topRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="center">
          <span>
            {desc}
          </span>
          <img src={PF! + img} alt="post" />
        </div>
        <div className="bottom">
          <div className="bottomLeft">
            <img src={`${PF}like.png` } onClick={likeHandler} alt="like"/>
            <img src={`${PF}heart.png` } onClick={likeHandler} alt="heart" />
            <span>{likeCount} people liked it</span>
          </div>
          <div className="bottomRight">
            <span>{comments} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
import './rightbar.scss'
import { Users } from '../../dummyData'
import Online from '../online/Online'
import { User } from '../../types/User';
import { useContext, useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import { Remove } from '@mui/icons-material';


type rightbarType = {
  user?: User;
}

export default function Rightbar({user}: rightbarType) {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [friends, setFriends] = useState<User[]>([])
  const {user: currentUser, dispatch} = useContext<any>(AuthContext)
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id))

  useEffect(( ) => {
    setFollowed(currentUser.followings.includes(user?._id))
  }, [currentUser, user?._id])

  useEffect(( ) => {
    const getFriends = async () => {
      try{
        const friendList = await api.get("/users/friends/" + user?._id)
        setFriends(friendList.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getFriends()
  }, [user])

  const handleClick = async () => {
    try{
      if(followed) {
        await api.put('/users/'+user?._id+'/unfollow', {userId: currentUser._id})
        dispatch({type:"UNFOLLOW", payload: user?._id})
      } else {
        await api.put('/users/'+user?._id+'/follow',  {userId: currentUser._id})
        dispatch({type:"FOLLOW", payload: user?._id})
      }
    } catch (err) {
      console.log(err)
    }
    setFollowed(!followed)
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="homeRightbar">
          <img src={`${PF}gift.png`} crossOrigin="" alt="birthday" />
          <span><b>Augusto Soares</b> and <b>6 other friends</b> and  have a birthday today</span>
        </div>
        <img src="/assets/ad.png" crossOrigin="" alt="ad" />
        <h4>Online Friends</h4>
        <ul>
          {Users.map((u) => (
            <Online 
              key={u.id}
              username={u.username}
              profilePicture={u.profilePicture}
            />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <div className="profileRightbar">
        {user?.username !== currentUser.username && (
          <button className="followButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove/> : <AddIcon/>}
          </button>
        )}
      <h4>User Information</h4>
      <div className="info">
        <div>
          <span className="key">City:</span>
          <span className="value">{user?.city}</span>
        </div>
        <div>
          <span className="key">From:</span>
          <span className="value">{user?.from}</span>
        </div>
        <div>
          <span className="key">Relationship:</span>
          <span className="value">{user?.relationship === 1 
            ? "Single" 
            : user?.relationship === 2 
            ? "Married" 
            : "-" }
          </span>
        </div>
      </div>
      <h4>User Friends</h4>
      <div className="followings">
        {friends.map(friend => (
          <Link key={friend._id} to={"/profile/" + friend?.username} style={{textDecoration: "none"}}>
            <div>
              <img src={friend?.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"}  crossOrigin="" alt="profile" />
              <span>{friend?.username}</span>
            </div>   
          </Link>
        ))}
      </div>
      
      </div>
    )
  }
  
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar/> : <HomeRightbar />}
      </div>
    </div>
  )
}
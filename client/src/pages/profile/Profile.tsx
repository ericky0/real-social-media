import { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import api from "../../services/api";

import { useParams } from "react-router"

import './profile.scss'
import { User } from "../../types/User";

export default function Profile() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [user, setUser] = useState<User>()
  const username = useParams().username


  useEffect(() => {
    const fetchUser = async () => {
      const res = await api.get(`users?username=${username}`) 
      setUser(res.data)
    }
    fetchUser()
  }, [username])


  return (
    <> 
      <Topbar/>
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
          <div className="rightTop">
            <div className="cover">
              <img className="coverImg" src={user?.coverPicture ? PF + user?.coverPicture : PF! + 'noCover.jpg'} alt="cover" />
              <img className="userImg" src={user?.profilePicture ? PF + user?.profilePicture : PF! + 'person/noAvatar.png'} alt="user"/>
            </div>
            <div className="info">
              <h4>{user?.username}</h4>
              <span>{user?.desc}</span>
            </div>
          </div>
          <div className="rightBottom">
            <Feed username={username}/>
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
    
  )
}
import { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import api from "../../services/api";

import './profile.scss'

type IUser = {
  username: string;
  desc?: string;
  city: string;
  from: string;
  relationship: number;

}

export default function Profile() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [user, setUser] = useState<IUser>()
  useEffect(() => {
    const fetchUser = async () => {
      const res = await api.get(`users?username=Erick Hogarth`) 
      setUser(res.data)
    }
    fetchUser()
  }, [])


  return (
    <> 
      <Topbar/>
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
          <div className="rightTop">
            <div className="cover">
              <img className="coverImg" src={`${PF}post/3.jpeg`} alt="cover" />
              <img className="userImg" src={`${PF}person/4.jpeg`} alt="user"/>
            </div>
            <div className="info">
              <h4>{user?.username}</h4>
              <span>{user?.desc}</span>
            </div>
          </div>
          <div className="rightBottom">
            <Feed username={user?.username}/>
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
    
  )
}
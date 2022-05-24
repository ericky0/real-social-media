import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

import './profile.scss'


export default function Profile() {
  return (
    <> 
      <Topbar/>
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
          <div className="rightTop">
            <div className="cover">
              <img className="coverImg" src="/assets/post/3.jpeg" alt="cover" />
              <img className="userImg" src="/assets/person/4.jpeg" alt="user"/>
            </div>
            <div className="info">
              <h4>Erick Hogarth</h4>
              <span>Our scars serve to remind us the past was real.</span>
            </div>
          </div>
          <div className="rightBottom">
            <Feed />
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
    
  )
}
import './topbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { User } from '../../types/User';



export default function Topbar() {

  const { user }: any | User = useContext<any>(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className="topbar">

      <div className="topbarLeft">
        <Link to="/" style={{textDecoration: 'none'}}>
          <span>RealSocial</span>
        </Link>
      </div>

      <div className="topbarCenter">
        <div>
          <SearchIcon className="search"/>
          <input placeholder="Search for friend, post or video" type="text" className="searchInput" />
        </div>
      </div>

      <div className="topbarRight">
        <div className="topbarLinks">
          <span>Homepage</span>
          <span>Timeline</span>
        </div>
        
        <div className="topbarIcons">
          <div>
            <PersonIcon/>
            <span>1</span>
          </div>

          <div>
            <ChatIcon/>
            <span>2</span>
          </div>

          <div>
            <NotificationsIcon/>
            <span>1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`} style={{textDecoration: 'none'}}>
          <img src={
            user?.profilePicture 
              ? PF + user?.profilePicture 
              : PF + "person/noAvatar.png"
            } 
            alt="profilePicture"/>
        </Link>
      </div>
    </div>
  )
}
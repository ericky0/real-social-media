import './topbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Topbar() {
  return (
    <div className="topbar">

      <div className="topbarLeft">
        <span>RealSocial</span>
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

        <img src="/assets/person/1.jpeg" alt="profilePicture"/>

      </div>
    </div>
  )
}
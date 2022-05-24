import './sidebar.scss'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpIcon from '@mui/icons-material/Help';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import CloseFriend from '../closeFriend/CloseFriend';
import { Users } from '../../dummyData'
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="icons">
          <li>
              <RssFeedIcon />
              <span>Feed</span>
            </li>
            <li>
              <ChatIcon />
              <span>Chat</span>
            </li>
            <li>
              <PlayCircleIcon />
              <span>Videos</span>
            </li>
            <li>
              <GroupIcon />
              <span>Groups</span>
            </li>
            <li>
              <BookmarkIcon />
              <span>Bookmarks</span>
            </li>
            <li>
              <HelpIcon />
              <span>Help</span>
            </li>
            <li>
              <WorkOutlineIcon />
              <span>Jobs</span>
            </li>
            <li>
              <EventIcon />
              <span>Events</span>
            </li>
            <li>
              <SchoolIcon />
              <span>Courses</span>
            </li>
        </ul>
        <button>Show More</button>
        <hr/>
        <ul className="friendList">
          {Users.map((u) => (
            <CloseFriend 
              key={u.id}
              username={u.username}
              profilePicture={u.profilePicture}
            />
          ))}
        </ul>

      </div>
    </div>
  )
}
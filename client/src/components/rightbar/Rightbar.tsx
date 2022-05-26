import './rightbar.scss'
import { Users } from '../../dummyData'
import Online from '../online/Online'

type IUser = {
  city: string;
  from: string;
  relationship: number;
}

type rightbarType = {
  user?: IUser;
}

export default function Rightbar({user}: rightbarType) {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const HomeRightbar = () => {
    return (
      <>
        <div className="homeRightbar">
          <img src={`${PF}gift.png`} alt="birthday" />
          <span><b>Augusto Soares</b> and <b>6 other friends</b> and  have a birthday today</span>
        </div>
        <img src="/assets/ad.png" alt="ad" />
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
          <span className="value">{user?.relationship}</span>
        </div>
      </div>
      <h4>User Friends</h4>
      <div className="followings">
        <div>
          <img src={`${PF}person/1.jpeg`} alt="profile" />
          <span>John Carter</span>
        </div>
        <div>
          <img src={`${PF}person/2.jpeg`} alt="profile" />
          <span>John Carter</span>
        </div>
        <div>
          <img src={`${PF}person/3.jpeg`} alt="profile" />
          <span>John Carter</span>
        </div>
        <div>
          <img src={`${PF}person/4.jpeg`} alt="profile" />
          <span>John Carter</span>
        </div>
        <div>
          <img src={`${PF}person/5.jpeg`} alt="profile" />
          <span>John Carter</span>
        </div>
        <div>
          <img src={`${PF}person/6.jpeg`} alt="profile" />
          <span>John Carter</span>
        </div>
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
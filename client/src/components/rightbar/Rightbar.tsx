import './rightbar.scss'
import { Users } from '../../dummyData'
import Online from '../online/Online'

type rightbarType = {
  profile?: boolean;
}

export default function Rightbar({profile = false}: rightbarType) {
  
  const HomeRightbar = () => {
    return (
      <>
        <div className="homeRightbar">
          <img src="/assets/gift.png" alt="birthday" />
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
          <span className="value">New York</span>
        </div>
        <div>
          <span className="key">From:</span>
          <span className="value">Madrid</span>
        </div>
        <div>
          <span className="key">Relationship:</span>
          <span className="value">Single</span>
        </div>
      </div>
      <h4>User Friends</h4>
      <div className="followings">
        <div>
          <img src="/assets/person/1.jpeg" alt="profile" />
          <span>John Carter</span>
        </div>
        <div>
          <img src="/assets/person/2.jpeg" alt="profile" />
          <span>John Carter</span>
        </div>
        <div>
          <img src="/assets/person/3.jpeg" alt="profile" />
          <span>John Carter</span>
        </div>
        <div>
          <img src="/assets/person/4.jpeg" alt="profile" />
          <span>John Carter</span>
        </div>
        <div>
          <img src="/assets/person/5.jpeg" alt="profile" />
          <span>John Carter</span>
        </div>
        <div>
          <img src="/assets/person/6.jpeg" alt="profile" />
          <span>John Carter</span>
        </div>
      </div>
      </div>

    )
  }
  
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar/> : <HomeRightbar />}
      </div>
    </div>
  )
}
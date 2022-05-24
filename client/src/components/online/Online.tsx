import "./online.scss"

type onlineProp = {
  profilePicture?: string;
  username: string;
}

export default function Online({profilePicture, username}: onlineProp) {
  return (
    <li>
      <div>
        <img src={profilePicture} alt="profile" />
        <span></span>
      </div>
      <span>{username}</span>
    </li>
  )
}
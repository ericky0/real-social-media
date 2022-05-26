import "./online.scss"

type onlineProp = {
  profilePicture?: string;
  username: string;
}

export default function Online({profilePicture, username}: onlineProp) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  
  return (
    <li>
      <div>
        <img src={PF! + profilePicture} alt="profile" />
        <span></span>
      </div>
      <span>{username}</span>
    </li>
  )
}
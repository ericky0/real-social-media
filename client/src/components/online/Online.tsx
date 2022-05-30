import { User } from "../../types/User"
import "./online.scss"

export default function Online({profilePicture, username}: User) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  
  return (
    <li>
      <div>
        <img src={PF! + profilePicture} crossOrigin=""alt="profile" />
        <span></span>
      </div>
      <span>{username}</span>
    </li>
  )
}
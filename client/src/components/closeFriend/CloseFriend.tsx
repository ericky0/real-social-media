import { User } from "../../types/User"
import "./closeFriend.scss"

export default function CloseFriend({profilePicture, username}: User) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  
  return (
    <li>
      <img src={PF! + profilePicture} alt="profile" />
      <span>{username}</span>
    </li>
  )
}
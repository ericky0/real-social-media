import "./closeFriend.scss"

type closeFriendProp = {
  profilePicture?: string;
  username: string;
}

export default function CloseFriend({profilePicture, username}: closeFriendProp) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  
  return (
    <li>
      <img src={PF! + profilePicture} alt="profile" />
      <span>{username}</span>
    </li>
  )
}
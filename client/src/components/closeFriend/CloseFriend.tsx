import "./closeFriend.scss"

type closeFriendProp = {
  profilePicture?: string;
  username: string;
}

export default function CloseFriend({profilePicture, username}: closeFriendProp) {
  return (
    <li>
      <img src={profilePicture} alt="profile" />
      <span>{username}</span>
    </li>
  )
}
import './share.scss'

import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export default function Share() {

  const { user } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className="share">
      <div className="shareWrapper">

        <div className="top">
          <img src={user?.profilePicture ? PF + user?.profilePicture : PF! + 'person/noAvatar.png'} alt="person" />
          <input 
            type="text"
            placeholder={"What's in your mind " + user?.username + "?"}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="options">

            <div className="option">
              <PermMediaIcon htmlColor="tomato" className="icon" />
              <span>Photo or Video</span>
            </div>

            <div className="option">
              <LabelIcon htmlColor="blue" className="icon" />
              <span>Tag</span>
            </div>

            <div className="option">
              <LocationOnIcon htmlColor="green" className="icon" />
              <span>Location</span>
            </div>

            <div className="option">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="icon" />
              <span>Feelings</span>
            </div>
          </div>
          <button>Share</button>
        </div>

      </div>
    </div>
  )
}
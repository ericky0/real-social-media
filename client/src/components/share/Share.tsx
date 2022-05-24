import './share.scss'

import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

export default function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">

        <div className="top">
          <img src="/assets/person/1.jpeg" alt="person" />
          <input 
            type="text"
            placeholder="What's in your mind Erick?"
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
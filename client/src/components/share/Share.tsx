import './share.scss'

import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { AuthContext } from '../../context/AuthContext';
import { FormEvent, useContext, useRef, useState } from 'react';
import { Post } from '../../types/Post';
import api from '../../services/api';

export default function Share() {

  const { user } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const desc = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault()
    const newPost: Post = {
      userId: user._id,
      desc: desc.current?.value,
    }
    if(file) {
      const data = new FormData();
      const fileName = Date.now() + file.name
      data.append("file", file)
      data.append("name", fileName)
      newPost.img = fileName
      try {
        await api.post("/upload", data)
      } catch (err) {
        console.log(err)
      }
    }
    try {
      await api.post("/posts/create", newPost)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="share">
      <div className="shareWrapper">

        <div className="top">
          <img crossOrigin="" src={user?.profilePicture ? PF + user?.profilePicture : PF! + 'person/noAvatar.png'} alt="person" />
          <input 
            type="text"
            placeholder={"What's in your mind " + user?.username + "?"}
            ref={desc}
          />
        </div>
        <hr />
        <form className="bottom" onSubmit={submitHandler}>
          <div className="options">

            <label htmlFor='file' className="option">
              <PermMediaIcon htmlColor="tomato" className="icon" />
              <span>Photo or Video</span>
              <input 
                type="file" 
                style={{display: "none"}}
                id="file" 
                accept='.png, .jpeg, .jpg' 
                onChange={(event) => {
                  const target = event.target as HTMLInputElement
                  const file = target.files?.[0]
                  setFile(file)
                }}/>
            </label>

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
          <button type="submit">Share</button>
        </form>

      </div>
    </div>
  )
}
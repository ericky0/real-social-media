import './share.scss'

import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { AuthContext } from '../../context/AuthContext';
import { FormEvent, useContext, useRef, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { Post } from '../../types/Post';
import api from '../../services/api';

export default function Share() {

  const { user } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const desc = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>()

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault()
    const newPost: Post = {
      userId: user._id,
      desc: desc.current?.value,
    }
    if(file) {
      const data = new FormData();
      data.append("file", file)
      data.append("name", file.name)
      try {
        const res = await api.post("/upload", data)
        newPost.img = res.data
      } catch (err) {
        console.log(err)
      }
    }
    try {
      await api.post("/posts/create", newPost)
      window.location.reload()
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
        {file && (
          <div className="imgContainer">
            <img src={URL.createObjectURL(file)} alt="preview"/>
            <CancelIcon className="cancelImg" onClick={() => setFile(null)}/>
          </div>
        )}
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
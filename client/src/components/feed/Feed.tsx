import { useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import api from '../../services/api'

import './feed.scss'

type IPost = {
  comments: number;
  createdAt: Date;
  desc: string;
  _id: string;
  likes: [];
  userId: string;
  img: string;
}

type feedProps = { 
  username: string;
}

export default function Feed({username}: feedProps){
  
  const [posts, setPosts] = useState<IPost[]>([])
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await api.get('posts/timeline/628f5b558e201698bce8a067')
      setPosts(res.data)
    }
    fetchPosts()
  }, [])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p)=>(
          <Post 
            key={p._id}
            comment={p.comments}
            date={p.createdAt}
            like={p.likes}
            userId={p.userId}
            desc={p.desc}
            photo={p.img}
          />
        ))}

      </div>
    </div>
  )
}
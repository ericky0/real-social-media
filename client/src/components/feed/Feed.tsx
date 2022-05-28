import { useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import api from '../../services/api'

import './feed.scss'
import { User } from '../../types/User'
import { Post as PostType } from '../../types/Post'

export default function Feed({username}: User){
  const [posts, setPosts] = useState<PostType[]>([])
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
      ? await api.get('posts/profile/' + username)
      : await api.get('posts/timeline/628f5b558e201698bce8a067')
      setPosts(res.data)
    }
    fetchPosts()
  }, [username])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p)=>(
          <Post 
            key={p._id}
            comments={p.comments}
            createdAt={p.createdAt}
            likes={p.likes}
            userId={p.userId}
            desc={p.desc}
            img={p.img}
          />
        ))}

      </div>
    </div>
  )
}
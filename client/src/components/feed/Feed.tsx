import { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import api from '../../services/api'
import './feed.scss'
import { User } from '../../types/User'
import { Post as PostType } from '../../types/Post'
import { AuthContext } from '../../context/AuthContext'

export default function Feed({username}: User){
  const [posts, setPosts] = useState<PostType[]>([])
  const { user } = useContext(AuthContext)
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
      ? await api.get('posts/profile/' + username)
      : await api.get('posts/timeline/' + user._id)
      setPosts(res.data.sort((p1: PostType, p2: PostType) => {
        const date1 = new Date(p2.createdAt!)
        const date2 = new Date(p1.createdAt!)
        
        return date1.getTime() - date2.getTime()
      }))
    }
    fetchPosts()
  }, [username, user._id])
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p)=>(
          <Post 
            key={p._id}
            comments={p.comments}
            createdAt={p.createdAt}
            likes={p.likes}
            userId={p.userId}
            desc={p.desc}
            img={p.img}
            _id={p._id}
          />
        ))}

      </div>
    </div>
  )
}
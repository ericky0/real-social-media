import Post from '../post/Post'
import Share from '../share/Share'
import { Posts } from '../../dummyData'

import './feed.scss'

export default function Feed(){
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((p)=>(
          <Post 
            key={p.id}
            comment={p.comment}
            date={p.date}
            like={p.like}
            userId={p.userId}
            desc={p.desc}
            photo={p.photo}
          />
        ))}

      </div>
    </div>
  )
}
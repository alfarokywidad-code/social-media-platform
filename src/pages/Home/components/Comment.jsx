import './Comment.css'
import { useState } from 'react'

function Comment({posts, setPosts}) {
  const [comment, setComment] = useState("");

    // Add Post------------------------------------------------------------------------------------------------------
    const addComment=(e)=>{
      e.preventDefault()
     if (comment.trim()==="" ){
      alert('write somthing')
      return
    }

  }
  return (
    <div>
        <p>Comments (  )</p>
        <form onSubmit={addComment}>
          <input type="text" placeholder='Add a comment' onChange={(e)=>setComment(e.target.value)} value={comment}/>
          <button><i className="fa-solid fa-paper-plane"></i></button>
        </form>


        
    </div>
  )
}

export default Comment
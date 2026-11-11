import './Comment.css'
import { useState, useContext } from 'react'
import { MyContext } from '../../../utils/MyContext';


function Comment({post}) {
  const [users, setUsers, posts, setPosts]=useContext(MyContext)
  const [comment, setComment] = useState([]);
  const [text, setText] = useState("")

    // Add Post------------------------------------------------------------------------------------------------------
    const addComment=(e)=>{
      e.preventDefault()
     if (text.trim()==="" ){
      alert('write somthing')
      return
    }

    const newComment ={
      id: Date.now(),
      text: text

    }
    setComment([...comment, newComment])
    
    setText("")

  }
  // Delete------------------------------------------------------------------------------------------------------
  const deleteComment = (id)=>{
    setComment(comment.filter((comnt)=>comnt.id !== id))
  }


  return (
    <div>
        <p>Comments ( {comment.length} )</p>
        <form onSubmit={addComment}>
          <input type="text" placeholder='Add a comment' onChange={(e)=>setText(e.target.value)} value={text}/>
          <button type='submit'><i className="fa-solid fa-paper-plane"></i></button>
        </form>


        <div>
          {comment.map((c)=>{
            return(
              <div key={c.id}>
              <p> {c.text} </p>
              <button onClick={()=>deleteComment(c.id)}>Delete</button>

            </div>
            ) 
            
          })}
        </div>
        
    </div>
  )
}

export default Comment;
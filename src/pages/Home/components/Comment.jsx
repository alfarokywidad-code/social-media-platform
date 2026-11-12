import "./Comment.css";
import { useState } from "react";
import CommentsModalCard from "./commentsModal";

function Comment({ post, commentIsClicked, clickComments }) {
  const [comment, setComment] = useState([]);
  const [text, setText] = useState("");

  // Add Post------------------------------------------------------------------------------------------------------
  const addComment = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      alert("write somthing");
      return;
    }

    const newComment = {
      id: Date.now(),
      text: text,
    };
    setComment([...comment, newComment]);

    setText("");
  };
  // Delete------------------------------------------------------------------------------------------------------
  const deleteComment = (id) => {
    setComment(comment.filter((comnt) => comnt.id !== id));
  };

  return (
    <div>
      <CommentsModalCard
        commentIsClicked={commentIsClicked}
        clickComments={clickComments}
        comment={comment}
        text={text}
        setText={setText}
        addComment={addComment}
        deleteComment={deleteComment}
      />

      {/* <div>
          {comment.map((c)=>{
            return(
              <div key={c.id}>
              <p> {c.text} </p>
              <button onClick={()=>deleteComment(c.id)}>Delete</button>

            </div>
            ) 
            
          })}
        </div> */}
    </div>
  );
}

export default Comment;

import "./commentsModal.css";
import testImage3 from "../../../assets/img/pic.jpg";
import UsersComments from "./usersComments";
import { useContext, useState } from "react";
import { MyContext } from "../../../utils/MyContext";
// import { use } from "react";

function CommentsModalCard(props) {
  const{users,setUsers,currentUser}=useContext(MyContext)
  console.log(users);
  
//* adding comment :
const[commentInput,setCommentInput] = useState('')
let getingCommentInput = (e)=>{
  setCommentInput(e.target.value)
}

let getformValue = (e) => {
  e.preventDefault();

  if (!commentInput.trim()) return;

  const postComment = {
    commentId: crypto.randomUUID(),
    authorId: currentUser.id,
    authorName: currentUser.name,
    commentDate: new Date().toLocaleString(),
    commentText: commentInput.trim(),
    authorPic: currentUser.imageProfile
  };
  if(!props.post.id){
          return
        }
  setUsers((prevUsers) =>
    prevUsers.map((user) => ({
      ...user,
      posts: (user.posts || []).map((post) =>{
        // console.log(post.id)
        // console.log(props.post.id)
      
        if (String(post.id) === String(props.post.id)) {

        return {
          ...post,
          comment: [...(post.comment || []), postComment]
        };

      }

      return post;
    })
    }))
  );

  setCommentInput("");
};
  return (
    <>
      <div
        className={
          props.commentIsClicked
            ? "commentModalContenaire"
            : "commentModalContenaire2"
        }
      >
        <div className="commentModalchildDiv">
          <p onClick={props.clickComments} className="Xbtn">
            x
          </p>
          <div className="DisplayedComentsDiv">
          <UsersComments post={props.post}/>
            {/* <h3>Comments ({props.comment?.length})</h3> */}
            {/* {(props.comment || []).map((c) => (
              <div key={c.id}>
                <p>{c.text}</p>
                <button onClick={() => props.deleteComment(c.id)}>
                  Delete
                </button>
              </div>
            ))} */}
          </div>
          <form className="commentsForm" onSubmit={getformValue}>
            <div className="commentUserPicDiv">
              <img className="commentUserPic" src={currentUser.imageProfile} alt="" />
            </div>
            <div className="commentsFormInputDiv">
              <textarea
                className="commentInputDiv"
                name=""
                placeholder="start the conversation ..."
                id=""
                value={commentInput}
                onChange={getingCommentInput}
              ></textarea>
              <button type="submit" className="commentBTN">
                send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default CommentsModalCard;

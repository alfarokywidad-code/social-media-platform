import "./commentsModal.css";
import testImage3 from "../../../assets/img/pic.jpg";
import UsersComments from "./usersComments";

function CommentsModalCard(props) {
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
            <h3>Comments ({props.comment?.length})</h3>
            {(props.comment || []).map((c) => (
              <div key={c.id}>
                <p>{c.text}</p>
                <button onClick={() => props.deleteComment(c.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <form className="commentsForm" onSubmit={props.addComment}>
            <div className="commentUserPicDiv">
              <img className="commentUserPic" src={testImage3} alt="" />
            </div>
            <div className="commentsFormInputDiv">
              <textarea
                className="commentInputDiv"
                name=""
                placeholder="start the conversation ..."
                id=""
                value={props.text}
                onChange={(e) => props.setText(e.target.value)}
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

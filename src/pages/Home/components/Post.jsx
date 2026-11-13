import "./Post.css";
import { useContext, useState } from "react";
import { MyContext } from "../../../utils/MyContext";
// import Comment from "./comment";
import ReactionPost from "./reactionsPostCard";
import CommentsModalCard from "./commentsModal";
import { useNavigate } from "react-router-dom";


function Post({ onEditPost,sortingAllUsersPosts }) {
  const { users, setUsers, currentUser } = useContext(MyContext);
  const [openMenu, setOpenMenu] = useState(null);
  const [commentIsClicked, setCommentIsClicked] = useState(null);
const navigate = useNavigate();
  if (!currentUser) return null;

  // Delete--------------------------------------------------------------------------------------------------------
  const deletePost = (postID, userId) => {
    const confrimation = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (confrimation) {
      setUsers((prev) =>
        prev.map((e) => {
          if (userId === e.id) {
            return {
              ...e,
              posts: e.posts.filter((post) => post.id !== postID),
            };
          }
          return e;
        }),
      );
    }
  };

  // Edite-------------------------------------------------------------------------------------------------------
  const edit = (postId, userId) => {

    const user = users.find((u) => u.id === userId);

    const findPost = user?.posts.find(
      (post) => post.id === postId
    );

    if (!findPost) return;
    if (userId !== currentUser.id) return;
    onEditPost(findPost);
    setOpenMenu(null);
  };
  //! open menu------------
  let editMenu = (postId) => {
    // setOpenMenu(openMenu === user.id ? null : user.id)

    if (openMenu === postId) {
      setOpenMenu(null);
    } else {
      setOpenMenu(postId);
    }
  };
  console.log(openMenu);
  //! achraf code here:
  // comments btn:
  let clickComments = (postId) => {
    if (commentIsClicked === postId) {
      setCommentIsClicked(null);
    } else {
      setCommentIsClicked(postId);
    }
  };
  //! achraf code here:
  return (
    <>

      {sortingAllUsersPosts.map((post) => (
        
        // return user.posts.map((post) => (
          <div className="containerPst" key={post.id}>
            <div>
              <div className="containerNameAcc">
                <div onClick={() => navigate(`/profile/${post.authorId}`)}className="userInfo">
                  <div>
                    <img
                      src={post.authorImage}
                      alt="User"
                      className="nameAcc"
                    />
                  </div>

                  <div>
                    <h4>{post.author}</h4>
                    <p>{post.date} </p>
                  </div>
                </div>

                <div className="containerMenu">
                  {/* //!!!!!!!! */}
                  <button className="menuBtn" onClick={() => editMenu(post.id)}>
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>

                  <div
                    className={
                      openMenu === post.id ? "dropDownMenu" : "dropDownMenu2"
                    }
                  >
                    {post.authorId === currentUser.id && (
                      <>
                        <button onClick={() => edit(post.id,post.authorId)}>
                          Edit
                        </button>

                        <button onClick={() => deletePost(post.id, post.authorId)}>
                          Delete
                        </button>
                      </>
                    )}

                  </div>
                </div>
              </div>
              <p className="postContent"> {post.content} </p>
              {post.image && (
                <img className="postImage" src={post.image} alt="" />
              )}

              <div></div>
              {/* //?achraf code here */}
              <ReactionPost clickComments={()=>clickComments(post.id) } post={post}  />
<CommentsModalCard
 commentIsClicked={commentIsClicked=== post.id} clickComments={()=>clickComments(post.id)} post = {post}/>
 {console.log(post)}
              {/* <Comment
                // post={post}
                commentIsClicked={commentIsClicked}
                clickComments={clickComments}
                /> */}
            </div>
          </div>
        // ));
      ))}
    </>
  );
}

export default Post;

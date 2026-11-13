
import Post from "./components/Post"
import { useContext, useState } from "react"
import { MyContext } from "../../utils/MyContext";

function Home() {
  const { users, setUsers, currentUser } = useContext(MyContext)
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [editpostId, setEditPostId] = useState(null);
  //!add post to users array:
  const addPosttoUsersArray = (e) => {
    e.preventDefault();
    if (content.trim() === "") {
      alert("write somthing");
      return;
    }
    if (!currentUser) return;
    const newPost = {
      id: crypto.randomUUID(),
      content: content,
      image: image,
      date: new Date().toLocaleString(),
      author: currentUser.name,
      authorId: currentUser.id,
      authorImage: currentUser.imageProfile,
      comment: [],
      likes:[]
    };
    setUsers((prev) => {
      return prev.map((e) => {
        if (e.id === currentUser.id) {
          if (editpostId) {
            return {
              ...e,
              posts: e.posts.map((post) => {
                if (post.id === editpostId) {
                  return {
                    ...post,
                    content: content,
                    image: image,
                  };
                }
                return post;
              }),
            };
          }
          return { ...e, posts: [...(e.posts || []), newPost] };
        }

        return e;
      });
    });

    setContent("");
    setImage("");
    setEditPostId(null);
    console.log(users);
  };
  const handleEditPost = (post) => {
    setContent(post.content);
    setImage(post.image);
    setEditPostId(post.id);
    
  };
  // ! sort posts by date and time :
  const getAllUsersPosts  = users.flatMap((user)=>(
user.posts || []
  ))
  const sortingAllUsersPosts = getAllUsersPosts.sort((a,b)=>(
     new Date(b.date) - new Date(a.date)
  ))
  
  return (
    <>
      {currentUser && (
        <section className="postSection">

          <div className="containerUserForm">

            <img
              className="nameAcc1"
              src={currentUser.imageProfile}
              alt="User"
            />

            <form onSubmit={addPosttoUsersArray}>

              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                placeholder="What's on your mind?"
              />

              <input
                onChange={(e) => setImage(e.target.value)}
                value={image}
                type="url"
                placeholder="Add image URL"
              />

              <button className="publishBtn" type="submit">
                {editpostId ? "Update Post" : "Post"}
              </button>

            </form>
          </div>

        </section>
      )}
      <Post onEditPost={handleEditPost} sortingAllUsersPosts={sortingAllUsersPosts}/>
    
    </>
  )
}

export default Home

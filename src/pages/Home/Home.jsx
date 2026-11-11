import PostCard from "./components/postCard";

// function HomePage() {
//     return(
//         <>
//         < PostCard/>
//         </>
//     )
// }
// export default HomePage ; 
import Post from "./components/Post"
import { useContext, useState } from "react"
import { MyContext } from "../../utils/MyContext";

function Home() {
  //! achraf code here !!
  // const {users} =useContext(MyContext);
  // let test = users.posts.map((e)=>(e))
  // console.log(test);
  
  //! achraf code here !!
  const [posts, setPosts] = useState([])
  return (
    <div>
      <Post posts={posts} setPosts={setPosts} />
      {/* //! achraf */}
      {/* {users.map((e)=>(
      < PostCard 
      key={e.id}
      name = {e.name}
      username ={e.username}
      posts ={e.posts}
      />
      ))} */}
      {/* //! achraf */}
    </div>
  )
}

export default Home

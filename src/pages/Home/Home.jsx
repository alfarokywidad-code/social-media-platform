import Post from "./components/Post"
import { useState } from "react"

function Home() {
    const [posts, setPosts]= useState([])
  return (
    <div>
        <Post posts={posts} setPosts={setPosts} />
    </div>
  )
}

export default Home
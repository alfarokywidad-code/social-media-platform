import './Post.css'
import { useState } from 'react'

function Post({posts, setPosts}) {
  const [content, setContent]= useState("")
  const [image, setImage]= useState("")

  const addPost= (e)=>{
    e.preventDefault()
    if (content.trim()==="" ){
      alert('write somthing')
      return
    }

    const newPost={
      id: Date.now(),
      content: content,
      image: image
    }
    setPosts([...posts, newPost])
    setContent("")
    setImage("")
  }
  return (
    <section className='postSection'>
      
        <form onSubmit={addPost}>
          <textarea onChange={(e)=> setContent(e.target.value)} name="" id="" value={content} placeholder="What's on your mind?"></textarea>
          <input onChange={(e)=> setImage(e.target.value)} value={image} type="url" />
          <button className='publishBtn' type='submit'>Post</button>
        </form>


        <div className='containerPst'>
          {posts.map((p) => {
            return(
              <div key={p.id}>

                <div className='containerNameAcc'>
                  <div className='nameAcc'>O</div>
                  <div><h4>Ouarda</h4></div>
                </div>
              <p className='postContent'> {p.content} </p>
              <img className='postImage' src={p.image} alt="" />
            </div>
            )
            
            
            
          })}
        </div>
    </section>
  )
}

export default Post
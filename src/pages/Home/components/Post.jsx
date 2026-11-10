import './Post.css'
import { useState } from 'react'
import Comment from './Comment'

function Post({posts, setPosts}) {
  const [content, setContent]= useState("")
  const [image, setImage]= useState("")
  const [openMenu, setOpenMenu]= useState(null)
  const [editpost,setEditPost]= useState(null)


  // Add Post------------------------------------------------------------------------------------------------------
  const addPost= (e)=>{
    e.preventDefault()
    if (content.trim()==="" ){
      alert('write somthing')
      return
    }

    const newPost={
      id: Date.now(),
      content: content,
      image: image,
      date: new Date().toLocaleDateString(),
      author: "ouarda",
      comment: []
    }
    if (editpost){
      setPosts(posts.map((p)=> p.id === editpost ? newPost :p))
      setEditPost("")
    } else{
      setPosts([...posts, newPost])
    }
    
    setContent("")
    setImage("")
  }

  // Delete--------------------------------------------------------------------------------------------------------
  const deletePost= (id)=>{
    const confrimation = window.confirm("Are you sure you want to delete this post?")
    if(confrimation){
      setPosts(posts.filter((post)=>post.id !== id))
    }
    
  }

  // Edite-------------------------------------------------------------------------------------------------------
  const edit =(post) =>{
    setEditPost(post.id)
    setContent(post.content)
    setImage(post.image)
    setOpenMenu(null)
    
  }


  
  return (
    <section className='postSection'>
      
        <form onSubmit={addPost}>
          <textarea onChange={(e)=> setContent(e.target.value)} name="" id="" value={content} placeholder="What's on your mind?"></textarea>
          <input onChange={(e)=> setImage(e.target.value)} value={image} type="url" placeholder='Add image URL'/>
          <button className='publishBtn' type='submit'>Post</button>
        </form>


        <div className='containerPst'>
          {posts.map((p) => {
            return(
              <div key={p.id}>

                <div className='containerNameAcc'>
                  <div className='userInfo'>
                  <div className='nameAcc'>O</div>
                  
                    <div>
                      <h4>Ouarda</h4>
                      <p>{p.date} </p>
                    </div>
                  </div>

                  <div className='containerMenu'>
                    <button className='menuBtn' onClick={()=>setOpenMenu(openMenu === p.id ? null : p.id)}>
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                    
                      {openMenu === p.id && (
                        <div className='dropDownMenu'>
                          <button onClick={()=>edit(p)}>Edit</button>
                          <button onClick={()=>deletePost(p.id)}>Delete</button>
                        </div>
                      )}
                  </div>
                    
                              
                  
                  
                </div>
              <p className='postContent'> {p.content} </p>
              <img className='postImage' src={p.image} alt="" />

              <div>
                
              </div>

              {/* // tst comnt */}
              <Comment posts={posts} setPosts={setPosts} />
       
            </div>
            )
            
            
            
          })}
        </div>


       
    </section>
  )
}

export default Post
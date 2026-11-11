import './Post.css'
import { useState } from 'react'
import Comment from './comment'
import ReactionPost from './reactionsPostCard'
import CommentsModalCard from './commentsModal'





function Post({post, posts, setPosts}) {
  const [content, setContent]= useState("")
  const [image, setImage]= useState("")
  const [openMenu, setOpenMenu]= useState(null)
  const [editpost,setEditPost]= useState(null)
// import './Post.css'
// import { useState } from 'react'
// import Comment from './Comment'
// import ReactionPost from './reactionsPostCard'
// import CommentsModalCard from './commentsModal'

// function Post({ posts, setPosts }) {
//   const [content, setContent] = useState("")
//   const [image, setImage] = useState("")
//   const [openMenu, setOpenMenu] = useState(null)
//   const [editpost, setEditPost] = useState(null)


  // Add Post------------------------------------------------------------------------------------------------------
  const addPost = (e) => {
    e.preventDefault()
    if (content.trim() === "") {
      alert('write somthing')
      return
    }

    const newPost = {
      id: Date.now(),
      content: content,
      image: image,
      date: new Date().toLocaleDateString(),
      author: "ouarda",
      comment: []
    }
    if (editpost) {
      setPosts(posts.map((p) => p.id === editpost ? newPost : p))
      setEditPost("")
    } else {
      setPosts([...posts, newPost])
    }

    setContent("")
    setImage("")
  }

  // Delete--------------------------------------------------------------------------------------------------------
  const deletePost = (id) => {
    const confrimation = window.confirm("Are you sure you want to delete this post?")
    if (confrimation) {
      setPosts(posts.filter((post) => post.id !== id))
    }

  }

  // Edite-------------------------------------------------------------------------------------------------------
  const edit = (post) => {
    setEditPost(post.id)
    setContent(post.content)
    setImage(post.image)
    setOpenMenu(null)

  }
//! achraf code here:
// comments btn:
    const [commentIsClicked,setCommentIsClicked]=useState(false);
    let clickComments = ()=>{
        if (commentIsClicked === true) {
            setCommentIsClicked(false)
        }else{
            setCommentIsClicked(true)
        }
    }
//! achraf code here:


  return (
    <section className='postSection'>

      <div className='containerUserForm'>
         <p className='nameAcc1'>O</p>

        <form onSubmit={addPost}>
          <textarea onChange={(e)=> setContent(e.target.value)} name="" id="" value={content} placeholder="What's on your mind?"></textarea>
          <input onChange={(e)=> setImage(e.target.value)} value={image} type="url" placeholder='Add image URL'/>
          <button className='publishBtn' type='submit'>Post</button>
        </form>
      </div>
      
        


        
          {posts.map((p) => {
            return(
              <div className='containerPst' key={p.id}>
              <div >

              <div className='containerNameAcc'>
                <div className='userInfo'>
                  <div className='nameAcc'>O</div>

                  <div>
                    <h4>Ouarda</h4>
                    <p>{p.date} </p>
                  </div>
                </div>

                <div className='containerMenu'>
                  <button className='menuBtn' onClick={() => setOpenMenu(openMenu === p.id ? null : p.id)}>
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>

                  {openMenu === p.id && (
                    <div className='dropDownMenu'>
                      <button onClick={() => edit(p)}>Edit</button>
                      <button onClick={() => deletePost(p.id)}>Delete</button>
                    </div>
                  )}
                </div>




              </div>
              <p className='postContent'> {p.content} </p>
              {p.image && (<img className='postImage' src={p.image} alt="" />)}

              <div>

              </div>
              {/* //?achraf code here */}
              <ReactionPost clickComments={clickComments}/>
                <CommentsModalCard commentIsClicked={commentIsClicked} clickComments={clickComments}/>
              {/* //?achraf code here */}
              {/* // tst comnt */}
              <Comment post={p}  />
       
            </div>
            </div>
            )
            
            
            
          })}
        


    </section>
  )
}

export default Post
import './Post.css'
import { useState } from 'react'
import Comment from './comment'
import ReactionPost from './reactionsPostCard'
import CommentsModalCard from './commentsModal'





function Post({ users, setUsers, currentUser }) {
  const [content, setContent] = useState("")
  const [image, setImage] = useState("")
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

  //!add post to users array:
  const addPosttoUsersArray = (e) => {
    e.preventDefault()
    if (content.trim() === "") {
      alert('write somthing')
      return
    }
    if (!currentUser) return;
    const newPost = {
      id: crypto.randomUUID(),
      content: content,
      image: image,
      date: new Date().toISOString(),
      author: currentUser.name,
      comment: []
    }
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
                    image: image
                  }
                }
                return post
              })
            }
          }
          return { ...e, posts: [...(e.posts || []), newPost] }
        };

        return e;
      })
    })

    // if (editpost) {
    //   setPosts(posts.map((p) => p.id === editpost ? newPost : p))
    //   setEditPost("")
    // } else {
    //   setPosts([...posts, newPost])
    // }

    setContent("")
    setImage("")
    setEditPostId(null)
    console.log(users);

  }
  // Add Post------------------------------------------------------------------------------------------------------
  // const addPost = (e) => {
  //   e.preventDefault()
  //   if (content.trim() === "") {
  //     alert('write somthing')
  //     return
  //   }

  //   const newPost = {
  //     id: Date.now(),
  //     content: content,
  //     image: image,
  //     date: new Date().toLocaleDateString(),
  //     author: "ouarda",
  //     comment: []
  //   }
  //   if (editpost) {
  //     setPosts(posts.map((p) => p.id === editpost ? newPost : p))
  //     setEditPost("")
  //   } else {
  //     setPosts([...posts, newPost])
  //   }

  //   setContent("")
  //   setImage("")
  // }

  // Delete--------------------------------------------------------------------------------------------------------
  const deletePost = (postID,userId) => {
    const confrimation = window.confirm("Are you sure you want to delete this post?")
    if (confrimation) {
     setUsers((prev)=>(
       prev.map((e)=>{
       if (userId === e.id) {
          return{...e,posts:e.posts.filter((post)=>post.id !== postID)}
        }
        return e ;
      })
     ))
    }

  }

  // Edite-------------------------------------------------------------------------------------------------------
  const [editpostId, setEditPostId] = useState(null)

  const edit = (postId) => {
    let findPost = currentUser.posts.find((e) => {
      return e.id === postId
    })
    console.log(findPost);

    // if (postId === currentUser.posts.map((e)=>(e.id))){

    setContent(findPost.content)
    setImage(findPost.image)
    // }
    setEditPostId(postId)
    // setOpenMenu(null)


  }
  //! open menu------------
  const [openMenu, setOpenMenu] = useState(null)
  let editMenu = (postId) => {
    // setOpenMenu(openMenu === user.id ? null : user.id)

    if (openMenu === postId) {
      setOpenMenu(null)
    } else {
      setOpenMenu(postId)
    }

  }
  console.log(openMenu);
  //! achraf code here:
  // comments btn:
  const [commentIsClicked, setCommentIsClicked] = useState(false);
  let clickComments = () => {
    if (commentIsClicked === true) {
      setCommentIsClicked(false)
    } else {
      setCommentIsClicked(true)
    }
  }
  //! achraf code here:
  // !! sorting postes by date
  const allPosts = users.flatMap((user) =>
    user.posts.map((post) => ({
        ...post,
        userId: user.id,
        username: user.username
    }))
    
);
const sortedPosts = [...allPosts].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
);
  return (
    <section className='postSection'>

      <div className='containerUserForm'>
        <p className='nameAcc1'>O</p>

        {/* <form onSubmit={addPost}> */}
        <form onSubmit={addPosttoUsersArray}>
          <textarea onChange={(e) => setContent(e.target.value)} name="" id="" value={content} placeholder="What's on your mind?"></textarea>
          <input onChange={(e) => setImage(e.target.value)} value={image} type="url" placeholder='Add image URL' />
          <button className='publishBtn' type='submit'>Post</button>
        </form>
      </div>





      {sortedPosts.map((post) => (
        // return (
        //   user.posts.map((post) => (

            <div className='containerPst' key={post.id}>
              <div >

                <div className='containerNameAcc'>
                  <div className='userInfo'>
                    <div className='nameAcc'>O</div>

                    <div>
                      <h4>{post.author}</h4>
                      <p>{post.date} </p>
                    </div>
                  </div>

                  <div className='containerMenu'>
                    {/* //!!!!!!!! */}
                    <button className='menuBtn' onClick={() => editMenu(post.id)} >
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>


                    <div className={openMenu === post.id ? 'dropDownMenu' : 'dropDownMenu2'}>
                      <button onClick={() => edit(post.id)}>Edit</button>
                      <button onClick={() => deletePost(post.id,post.userId)}>Delete</button>
                    </div>

                  </div>
                </div>
                <p className='postContent'> {post.content} </p>
                {post.image && (<img className='postImage' src={post.image} alt="" />)}

                <div>

                </div>
                {/* //?achraf code here */}
                <ReactionPost clickComments={clickComments} />
                <CommentsModalCard commentIsClicked={commentIsClicked} clickComments={clickComments} />
                {/* //?achraf code here */}
                {/* // tst comnt */}
                <Comment post={post} />

              </div>
            </div>
          // ))
        // )

      ))}



    </section>
  )
}

export default Post
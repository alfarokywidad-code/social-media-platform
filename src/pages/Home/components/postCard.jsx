// import './postCard.css';
// import testImage from '../../../assets/img/pic.jpg'
// import testImage2 from '../../../assets/img/photoPc.avif'
// import { useState } from 'react';
// import CommentsModalCard from './commentsModal';
// import ReactionPost from './reactionsPostCard';
// function PostCard(props) {
    
//    // comments btn:
//     const [commentIsClicked,setCommentIsClicked]=useState(false);
//     let clickComments = ()=>{
//         if (commentIsClicked === true) {
//             setCommentIsClicked(false)
//         }else{
//             setCommentIsClicked(true)
//         }
//     }
    
//     return (
//         <>
//             <div className='PostCardDiv'>
//                 <div className='PostCardChildDiv1'>
//                     <div className='PostCardChildDiv2'>
//                         <div className='PostCardProfilPicDiv'>
//                             <img className='PostCardProfilPic' src={testImage} alt="" />
//                         </div>
//                         <div>
//                             <p className='PostCardDivpara1'>{props.name}</p>
//                             <p className='PostCardDivpara2'>@{props.username} </p>
//                         </div>
//                     </div>
//                     <div className='PostCardChildDiv4'>
//                         <p className='PostCardChildDiv3'>...</p>
//                     </div>
//                 </div>
//                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut voluptate expedita.</p>
//                 <div className='PostCardPicDiv'>
//                     <img className='PostCardPic' src={testImage2} alt="" />
//                 </div>
//                 <ReactionPost clickComments={clickComments}/>
//                 <CommentsModalCard commentIsClicked={commentIsClicked} clickComments={clickComments}/>
//             </div>
//         </>
//     )
// }
// export default PostCard;
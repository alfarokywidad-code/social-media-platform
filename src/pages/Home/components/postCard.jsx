import './postCard.css';
import testImage from '../../../assets/img/pic.jpg'
import testImage2 from '../../../assets/img/photoPc.avif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart} from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import {faMessage} from '@fortawesome/free-regular-svg-icons';
import {faBookmark} from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
function PostCard() {
    const [isLiked,setIsLiked] = useState(false);
    const [likeCounter,setLikeCounter]= useState(0);
    let clickLike=()=>{
        if (isLiked === true) {
            setLikeCounter(likeCounter-1)
            setIsLiked(false);
        }else{
            setLikeCounter(likeCounter+1)
            setIsLiked(true)
        }
    }
    
    return (
        <>
            <div className='PostCardDiv'>
                <div className='PostCardChildDiv1'>
                    <div className='PostCardChildDiv2'>
                        <div className='PostCardProfilPicDiv'>
                            <img className='PostCardProfilPic' src={testImage} alt="" />
                        </div>
                        <div>
                            <p className='PostCardDivpara1'>name prename</p>
                            <p className='PostCardDivpara2'>poste date</p>
                        </div>
                    </div>
                    <div className='PostCardChildDiv4'>
                        <p className='PostCardChildDiv3'>...</p>
                    </div>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aut voluptate expedita.</p>
                <div className='PostCardPicDiv'>
                    <img className='PostCardPic' src={testImage2} alt="" />
                </div>
                <div className='PostCardReactionsDiv'>
                    <div className='PostCardReactions'>
                        <p> <FontAwesomeIcon onClick={clickLike} className={isLiked===true &&'reactionHeartIcon'} icon={isLiked?solidHeart:regularHeart} /> {likeCounter}</p>
                        <p> <FontAwesomeIcon icon={faMessage} />24</p>
                    </div>
                    <div><FontAwesomeIcon icon={faBookmark} /></div>
                </div>
            </div>
        </>
    )
}
export default PostCard;
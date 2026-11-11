import './reactionsPostCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
function ReactionPost(props) {
    console.log(props);
    
    // like btn:
    const [isLiked, setIsLiked] = useState(false);
    const [likeCounter, setLikeCounter] = useState(0);
    let clickLike = () => {
        if (isLiked === true) {
            setLikeCounter(likeCounter - 1)
            setIsLiked(false);
        } else {
            setLikeCounter(likeCounter + 1)
            setIsLiked(true)
        }
    }
    return (
        <>
            <div className='PostCardReactionsDiv'>
                <div className='PostCardReactions'>
                    <p> <FontAwesomeIcon onClick={clickLike} className={isLiked === true && 'reactionHeartIcon'} icon={isLiked ? solidHeart : regularHeart} /> {likeCounter}</p>
                    <p> <FontAwesomeIcon onClick={props.clickComments} icon={faMessage} />24</p>
                </div>
                <div><FontAwesomeIcon icon={faBookmark} /></div>
            </div>
        </>
    )
}
export default ReactionPost;
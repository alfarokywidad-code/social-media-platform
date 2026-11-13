import './reactionsPostCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { useContext } from 'react';
import { MyContext } from '../../../utils/MyContext';
function ReactionPost(props) {
    console.log(props);
    const { setUsers, currentUser } = useContext(MyContext);
    // like btn:
    // const [isLiked, setIsLiked] = useState(false);
    // const [likeCounter, setLikeCounter] = useState(0);
    // const isLiked = (props.post?.likes || []).includes(currentUser?.id);
    // const likeCounter = (props.post?.likes || []).length;
    const postLikes = props.post.likes || [];
    const checkisLicked = postLikes.includes(currentUser.id);
    let clickLike = () => {
        setUsers((prevUsers) => {
            return prevUsers.map((user) => {
                
                const newPosts = user.posts.map((post) => {
                    
                    if (post.id === props.post.id) {
                        const currentLikes = post.likes || [];
                        let newLikes;

                        if (checkisLicked === true) {
                            newLikes = currentLikes.filter((id) => id !== currentUser.id);
                        } else {
                            newLikes = [...currentLikes, currentUser.id];
                        }

                        return { ...post, likes: newLikes };
                    }

                    return post;
                });

                return { ...user, posts: newPosts };
            });
        });
    };
    return (
        <>
            <div className='PostCardReactionsDiv'>
                <div className='PostCardReactions'>
                    <p> <FontAwesomeIcon onClick={clickLike} className={checkisLicked === true && 'reactionHeartIcon'} icon={checkisLicked ? solidHeart : regularHeart} /> {postLikes.length}</p>
                    <p> <FontAwesomeIcon onClick={props.clickComments} icon={faMessage} />{props.post.comment.length}</p>
                </div>
                <div><FontAwesomeIcon icon={faBookmark} /></div>
            </div>
        </>
    )
}
export default ReactionPost;
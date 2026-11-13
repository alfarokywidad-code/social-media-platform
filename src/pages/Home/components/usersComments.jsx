import './usersComments.css';
import testPic5 from '../../../assets/img/pic.jpg'
import { useContext } from 'react';
import { MyContext } from '../../../utils/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
function UsersComments(props) {
    const{users,setUsers, currentUser,}=useContext(MyContext)
    let deletingComment = (comment,user)=>{
        if (user !== currentUser.id) return;

        setUsers((prevUsers) =>
            prevUsers.map((user) => ({
                ...user,
                posts: (user.posts || []).map((post) => {
                    if (String(post.id) === String(props.post.id)) {
                        return {
                            ...post,
                            comment: (post.comment || []).filter(
                                (com) => com.commentId !== comment
                            ),
                        };
                    }
                    return post;
                }),
            }))
        );
    }
    return (
        <>
            {(props.post.comment ||[]).map((e) => (
                <div className='usersCommentsContenaireDiv'>
                    <div className='usersCommentsContenaireDiv2'>
                        <div className='usersCommentsProfilePicDiv'>
                            <img className='usersCommentsProfilePic' src={e.authorPic?.trim() || undefined} alt="" />
                        </div>
                        <div>
                            <p className='usersCommentsName'>{e.authorName}  {e.commentDate}</p>
                            <p className='commentContent'>{e.commentText}</p>
                        </div>
                    </div>
                    <div className='trashCanDiv'>
                        {currentUser.id === e.authorId &&
                        
                        <button className='CommentTrashCan' onClick={()=>deletingComment(e.commentId,e.authorId)}><FontAwesomeIcon icon={faTrashCan} /></button>
                        }
                    </div>
                </div>
            ))}
        </>
    )
}
export default UsersComments;
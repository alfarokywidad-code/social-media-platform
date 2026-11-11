import './commentsModal.css';
import testImage3 from '../../../assets/img/pic.jpg'
import UsersComments from './usersComments';

function CommentsModalCard(props) {
    return (
        <>
            <div className={props.commentIsClicked?'commentModalContenaire':'commentModalContenaire2'}>
                <div className='commentModalchildDiv'>
                <p onClick={props.clickComments}  className='Xbtn'>x</p>
                    <div className='DisplayedComentsDiv'>
                        <UsersComments/>
                        <UsersComments/>
                        <UsersComments/>
                        <UsersComments/>
                        <UsersComments/>
                    </div>
                    <form className='commentsForm' action="">
                        <div className='commentUserPicDiv'>
                            <img className='commentUserPic' src={testImage3} alt="" />
                        </div>
                        <div className='commentsFormInputDiv'>
                            <textarea className='commentInputDiv' name="" placeholder='start the conversation ...' id="" ></textarea>
                            <button className='commentBTN'>send</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default CommentsModalCard;
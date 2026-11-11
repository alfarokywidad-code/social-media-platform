import "./Following.css";
import { useContext } from "react";
import { MyContext } from "../../utils/MyContext";


function Following() {
    const {users, handleUnfollow,currentUser} = useContext(MyContext);
    
    if (!currentUser) return null;

    const followingUsers = users.filter((user) =>
        currentUser.following.includes(user.id)
    );


    return (
        <section className="following-page">
            <h2>Following</h2>
            {followingUsers.length === 0

                ? (
                    <p className="following-empty">
                        You are not following anyone yet.
                    </p>
                )
                : (
                    followingUsers.map((user) => (

                        <div className="following-user" key={user.id}>
                            <img
                                src={user.imageProfile}
                                alt={user.name}
                            />

                            <div className="following-user-info">
                                <h3>{user.username}</h3>
                                <p>{user.bio}</p>
                            </div>
                            <button 
                            onClick={()=>handleUnfollow(currentUser.id,user.id)}
                            >Unfollow</button>
                        </div>

                    ))
                )
            }
        </section>
    );
}

export default Following;
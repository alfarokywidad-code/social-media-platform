import "./Followers.css";
import { useContext } from "react";
import { MyContext } from "../../utils/MyContext";

function Followers() {
    const { users, handleFollow, currentUser } = useContext(MyContext);

    if (!currentUser) return null;

    const followersUsers = users.filter((user) =>
        currentUser.followers.includes(user.id)
    );

    return (
        <section className="followers-page">
            <h2>
                Followers <span> ({followersUsers.length})</span>
            </h2>

            {followersUsers.map((user) => {
                const isFollowing = currentUser.following.includes(user.id);

                return (
                    <div className="follower-user" key={user.id}>

                        <img
                            src={user.imageProfile}
                            alt={user.name}
                        />

                        <div className="follower-user-info">
                            <h3>{user.username}</h3>
                            <p>{user.name}</p>
                            <span>{user.bio}</span>
                        </div>

                        {!isFollowing && (
                            <button
                                onClick={() => handleFollow(currentUser.id, user.id)}
                            >
                                Follow Back
                            </button>
                        )}

                    </div>
                );
            })}

        </section>
    )




}
export default Followers;
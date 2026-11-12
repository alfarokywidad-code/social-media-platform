
import "./suggestUsers.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../../utils/MyContext";
import FollowButton from "./FollowButton";

function SuggestUsers() {
    const { users, currentUser, handleFollow } = useContext(MyContext);

    if (!currentUser) return null;

    const suggestUsers = users.filter((user) =>
        user.id !== currentUser.id &&
        !currentUser.following.includes(user.id)
    ).slice(0, 5);

    return (
        <section className="suggested-users">

            <h3>Suggested for you</h3>

            {suggestUsers.map((user) => (

                <div className="suggested-user" key={user.id}>

                    <Link
                        to={`/profile/${user.id}`}
                        className="suggested-user-info"
                    >

                        <div className="suggested-avatar">
                            {user.imageProfile ? (
                                <img
                                    src={user.imageProfile}
                                    alt={user.username}
                                />
                            ) : (
                                user.name.charAt(0).toUpperCase()
                            )}
                        </div>

                        <div>
                            <h4>{user.username}</h4>
                            <p>{user.name}</p>
                        </div>

                    </Link>

                    <FollowButton
                        isFollowing={currentUser.following.includes(user.id)}
                        onFollow={() =>
                            handleFollow(currentUser.id, user.id)
                        }
                    />

                </div>
            ))}

            {suggestUsers.length === 0 && (
                <p className="suggested-empty">
                    You are following everyone!
                </p>
            )}

        </section>
    );
}

export default SuggestUsers;

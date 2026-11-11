import "./suggestUsers.css";
import { useContext } from "react";
import { MyContext } from "../../../utils/MyContext";
import FollowButton from"./FollowButton";


function SuggestUsers() {
    const {users, setUsers} = useContext(MyContext);
    const currentUser = users.find((user) =>
        user.isLoggedIn === true
    ) ?? null;
    if (!currentUser) return null;

    const suggestUsers = users.filter((user) =>
        user.id !== currentUser.id &&
        !currentUser.following.includes(user.id)
    ).slice(0, 5);

    function handleFollow(targetUserId) {

        if (targetUserId === currentUser.id) return;
        if (currentUser.following.includes(targetUserId)) return;
        setUsers((prevSetUsers) =>
            prevSetUsers.map((user) => {

                if (user.id === currentUser.id) {
                    return {
                        ...user,
                        following: [...user.following, targetUserId]
                    };
                }

                if (user.id === targetUserId) {
                    return {
                        ...user,
                        followers: [...user.followers, currentUser.id]
                    }
                }
                return user;
            })
        );

    }
    return (
         <section className="suggested-users">

            <h3>Suggested for you</h3>

            {suggestUsers.map((user) => (

                <div className="suggested-user" key={user.id}>

                    <div className="suggested-user-info">

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

                    </div>

                    <FollowButton
                        isFollowing={currentUser.following.includes(user.id)}
                        onFollow={() => handleFollow(user.id)}
                    />

                </div>
            ))}

            {suggestUsers.length === 0 && (
                <p className="suggested-empty">
                    You are following everyone!
                </p>
            )}

        </section>
    )

}

export default SuggestUsers;
import { useContext } from "react";
import "./Explore.css";
import { MyContext } from "../../utils/MyContext";
import FollowButton from "./Componenets/FollowButton";
import SuggestUsers from "./Componenets/suggestUsers";


function Explore() {

    const { users, search, handleFollow,
        handleUnfollow, currentUser
    } = useContext(MyContext);


    if (!currentUser) {
        return (
            <p>Current user not found.</p>
        );
    }

    const otherUsers = users.filter((user) =>
        user.id !== currentUser.id
    )

    const filterUsers = otherUsers.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <section className="explore">

            <div className="explore-main">

                <div className="explore-header">
                    <h2>Discover People</h2>
                    <p>Find and connect with new people.</p>
                </div>

                <div className="explore-users">

                    {filterUsers.map((user) => {

                        const isFollowing =
                            currentUser.following.includes(user.id);

                        return (
                            <div className="explore-card" key={user.id}>

                                <div className="explore-avatar">

                                    {user.imageProfile ? (
                                        <img
                                            src={user.imageProfile}
                                            alt={user.username}
                                        />
                                    ) : (
                                        user.name.toUpperCase()
                                    )}

                                </div>

                                <div className="explore-user-info">
                                    <h3>{user.username}</h3>
                                    <p>{user.name}</p>
                                    <span>{user.bio}</span>
                                </div>

                                <FollowButton
                                    isFollowing={isFollowing}
                                    onFollow={() => handleFollow(currentUser.id, user.id)}
                                    onUnfollow={() => handleUnfollow(currentUser.id, user.id)}
                                />

                            </div>
                        );
                    })}

                    {filterUsers.length === 0 && (
                        <p className="no-users">
                            No users found.
                        </p>
                    )}

                </div>

            </div>
            <aside>
                <SuggestUsers />
            </aside>


        </section>
    )
}

export default Explore;
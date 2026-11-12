
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Explore.css";
import { MyContext } from "../../utils/MyContext";
import FollowButton from "./Componenets/FollowButton";
import SuggestUsers from "./Componenets/suggestUsers";

function Explore() {
    const {
        users,
        currentUser,
        handleFollow,
        handleUnfollow
    } = useContext(MyContext);

    if (!currentUser) {
        return <p>Current user not found.</p>;
    }

    const usersNotFollowing = users.filter((user) =>
        user.id !== currentUser.id &&
        !currentUser.following.includes(user.id));
    const explorePosts = usersNotFollowing.map((user) =>
        user.posts.map((post) => ({
            ...post,
        }))
    );
    const allExplorePosts = explorePosts.flat();


    return (
        <section className="explore">
            <div className="explore-main">
                <div className="explore-header">
                    <h2>Discover Posts</h2>
                    <p>Explore posts from people you don't follow.</p>
                </div>

                <div className="explore-posts">

                    {explorePosts.length === 0 && (
                        <p className="no-users">
                            No posts to discover at the moment.
                        </p>
                    )}
                </div>
            </div>

            <aside>
                <SuggestUsers />
            </aside>
        </section>
    );
}

export default Explore;

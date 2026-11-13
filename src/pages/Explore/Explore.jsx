
import { useContext } from "react";
import "./Explore.css";
import "../../pages/Home/components/Post.css";
import { MyContext } from "../../utils/MyContext";
import SuggestUsers from "./Componenets/suggestUsers";
import Post from "../Home/components/Post";

function Explore() {
    const { users, currentUser } = useContext(MyContext);

    if (!currentUser) {
        return <p>Current user not found.</p>;
    }

    const usersNotFollowing = users.filter((user) =>
        user.id !== currentUser.id &&
        !currentUser.following.includes(user.id)
    );

    const explorePosts = usersNotFollowing.map((user) =>
        (user.posts || []).map((post) => ({
            ...post,
            authorId: user.id,
            author: user.username,
            authorImage: user.imageProfile
        }))
    );

    const allExplorePosts = explorePosts.flat();

    return (
        <section className="explore">
            <div className="explore-main">
                <div className="explore-header">
                    <div>
                        <span>DISCOVER</span>
                        <h2>Explore Posts</h2>
                        <p>Find new posts and discover new people.</p>
                    </div>
                </div>

                <div className="explore-posts">
                    {allExplorePosts.length === 0 ? (
                        <div className="no-users">
                            <h3>No posts available</h3>
                            <p>There are no posts to discover right now.</p>
                        </div>
                    ) : (
                        <Post sortingAllUsersPosts={allExplorePosts} />
                    )}
                </div>
            </div>

            <aside className="explore-sidebar">
                <SuggestUsers />
            </aside>
        </section>
    );
}

export default Explore;

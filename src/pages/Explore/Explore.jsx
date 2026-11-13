
import { useContext } from "react";
import "./Explore.css";
import "../../pages/Home/components/Post.css";
import { MyContext } from "../../utils/MyContext";
import SuggestUsers from "./Componenets/suggestUsers";
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
            userId: user.id,
            username: user.username,
            name: user.name,
            imageProfile: user.imageProfile
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
                        allExplorePosts.map((post) => (
                            <div className="containerPst" key={`${post.userId}-${post.id}`}>
                                <div className="containerNameAcc">
                                    <div className="userInfo">
                                        <div className="nameAcc">
                                            {post.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <h4>{post.author || post.name}</h4>
                                            <p>{new Date(post.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="postContent">{post.content}</p>
                                {post.image && (
                                    <img
                                        className="postImage"
                                        src={post.image}
                                        alt="Post"
                                    />
                                )}
                            </div>
                        ))
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

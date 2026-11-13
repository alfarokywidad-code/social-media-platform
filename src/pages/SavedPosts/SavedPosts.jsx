import { useContext } from "react";
import { Link } from "react-router-dom";
import BookmarkButton from "../../components/BookmarkButton";
import { MyContext } from "../../utils/MyContext";
import "./SavedPosts.css";

export default function SavedPosts() {
    const { users, currentUser } = useContext(MyContext);
    const postsById = new Map(
        users.flatMap((user) => (user.posts ?? []).map((post) => [post.id, post]))
    );
    const savedPosts = (currentUser?.savedPostIds ?? [])
        .map((id) => postsById.get(id))
        .filter(Boolean)
        .reverse();

    return (
        <section className="saved-posts">
            <h1>Saved Posts</h1>
            {savedPosts.length === 0 && (
                <div className="saved-post-card">
                    <p>No saved posts yet.</p>
                    <Link to="/">Back to feed</Link>
                </div>
            )}
            {savedPosts.map((post) => (
                <article className="saved-post-card" key={post.id}>
                    <header>
                        <div>
                            <strong>{post.author}</strong>
                            <p>{post.date}</p>
                        </div>
                        <BookmarkButton postId={post.id} />
                    </header>
                    <p className="saved-post-content">{post.content}</p>
                    {post.image?.trim() && <img src={post.image} alt={post.imageAlt ?? ""} />}
                </article>
            ))}
        </section>
    );
}

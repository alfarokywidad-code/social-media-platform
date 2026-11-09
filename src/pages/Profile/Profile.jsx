import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { MyContext } from "../../utils/MyContext";


function Profile() {
  // !Get user ID from URL
  const { id } = useParams();

  const [users, setUsers, posts, setPosts, comments, setComments, likes, setLikes, follows, setFollows] = useContext(MyContext);

  // !Find the user
  const profileUser = users.find((user) => user.id == id);


  // !Check if user exists
  if (!profileUser) {
    return (
      <div>
        <h2>User Not Found</h2>
        <p>This user does not exist.</p>
      </div>
    );
  }
  // !Get user's posts
  const userPosts = posts.filter(
    (post) => post.authorId == profileUser.id
  );

  // !Count posts
  const postsCount = userPosts.length;

  // !Count followers
  const followersCount = follows.filter(
    (follow) => follow.followingId == profileUser.id
  ).length;

  // !Count following
  const followingCount = follows.filter(
    (follow) => follow.followerId == profileUser.id
  ).length;



  return (
    <div>
      <h1>User Profile</h1>

      <div>

        <img
          src={profileUser.coverImage}
          width="100%"
        />
        <img
          src={profileUser.profilePicture}
          width="120"
        />
        <h2>{profileUser.fullName}</h2>
        <p>@{profileUser.username}</p>
        <p>{profileUser.bio}</p>
        <p>{profileUser.location}</p>
      </div>

      <div>
        <div>
          <h3>{postsCount}</h3>
          <p>Posts</p>
        </div>

        <div>
          <h3>{followersCount}</h3>
          <p>Followers</p>
        </div>

        <div>
          <h3>{followingCount}</h3>
          <p>Following</p>
        </div>

      </div>

      <div>

        <h2>My Posts</h2>

        {userPosts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (

          userPosts.map((post) => (
            <div key={post.id}>
              <p>{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  width="200"
                />
              )}
              <p>{post.date}</p>

            </div>
          ))

        )}

      </div>

    </div>
  );
}

export default Profile;
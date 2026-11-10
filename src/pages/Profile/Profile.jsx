import { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MyContext } from "../../utils/MyContext";
import "./Profile.css";

function Profile() {


  // !Get user ID from URL
  const { id } = useParams();

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [users] = useContext(MyContext);
console.log(
  users.map((user) => ({
    name: user.name,
    id: user.id
  }))
);
  // !Find the user
  const profileUser = users.find((user) => user.id === id);


  // !Check if user exists
  if (!profileUser) {
    return (
      <div>
        <h2>User Not Found</h2>
        <p>This user does not exist.</p>
      </div>
    );
  }

  // Get user's posts
  const userPosts = profileUser.posts || [];

  // Get user's followers
  const userFollowers = profileUser.followers || [];

  // Get users that this user follows
  const userFollowing = profileUser.following || [];

  // Count posts
  const postsCount = userPosts.length;

  // Count followers
  const followersCount = userFollowers.length;

  // Count following
  const followingCount = userFollowing.length;

  // Get followers' user information
  const followersUsers = users.filter((user) =>
    userFollowers.includes(user.id)
  );

  // Get following users' information
  const followingUsers = users.filter((user) =>
    userFollowing.includes(user.id)
  );

  return (
    <div className="profile-page">

      {/* 1. Profile Cover */}
      <section className="profile-cover">

        {profileUser.coverImage ? (
          <img
            src={profileUser.coverImage}
            alt="Profile Cover"
            className="cover-image"
          />
        ) : (
          <div className="default-cover"></div>
        )}

      </section>


      {/* 2. Profile Information */}
      <section className="profile-information">

        <div className="profile-avatar">

          {profileUser.imageProfile ? (
            <img
              src={profileUser.imageProfile}
              alt="Profile Picture"
              className="profile-image"
            />
          ) : (
            <div className="default-avatar"></div>
          )}

        </div>

        <div className="profile-details">

          <h2>{profileUser.name}</h2>

          <p>@{profileUser.username}</p>

          <p>{profileUser.bio}</p>

          <p>{profileUser.location}</p>

        </div>

      </section>


      {/* 3. Profile Statistics */}
      <section className="profile-stats">

        <div>
          <h3>{postsCount}</h3>
          <p>Posts</p>
        </div>

        <button
          type="button"
          onClick={() => setShowFollowers(!showFollowers)}
        >
          <h3>{followersCount}</h3>
          <p>Followers</p>
        </button>

        <button
          type="button"
          onClick={() => setShowFollowing(!showFollowing)}
        >
          <h3>{followingCount}</h3>
          <p>Following</p>
        </button>

      </section>


      {/* 4. Followers and Following */}
      <section className="profile-connections">
        {showFollowers && (
          <div className="followers-list">

            <h3>Followers</h3>

            {followersUsers.length === 0 ? (

              <p>No followers yet.</p>

            ) : (

              followersUsers.map((user) => (

                <Link
                  to={`/profile/${user.id}`}
                  key={user.id}
                >

                  {user.imageProfile && (
                    <img
                      src={user.imageProfile}
                      alt={user.name}
                    />
                  )}

                  <p>{user.name}</p>
                  <p>@{user.username}</p>

                </Link>

              ))

            )}

          </div>
        )}
        {showFollowing && (
          <div className="following-list">

            <h3>Following</h3>

            {followingUsers.length === 0 ? (

              <p>Not following anyone yet.</p>

            ) : (

              followingUsers.map((user) => (

                <div key={user.id}>

                  {user.imageProfile && (
                    <img
                      src={user.imageProfile}
                      alt={user.name}
                    />
                  )}

                  <p>{user.name}</p>
                  <p>@{user.username}</p>

                </div>

              ))

            )}

          </div>
        )}
      </section>


      {/* 5. User Posts */}
      <section className="profile-posts">

        <h2>Posts</h2>

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
                />
              )}

              <p>{post.date}</p>

            </div>

          ))

        )}

      </section>

    </div>
  );

}

export default Profile;
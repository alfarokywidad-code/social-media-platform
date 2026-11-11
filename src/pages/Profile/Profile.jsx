import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MyContext } from "../../utils/MyContext";
import "./Profile.css";

function Profile() {

  // !Get user ID from URL
  const { id } = useParams();

  // !Get data from MyContext
  const { users, setUsers } = useContext(MyContext);

  // !Show or hide followers and following
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  // !Edit profile
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [imageProfile, setImageProfile] = useState("");
  const [coverImage, setCoverImage] = useState("");
  // !Find the profile user
  const profileUser = users.find((user) => user.id === id);

  // !Check if user exists
  if (!profileUser) {
    return (
      <div className="user-not-found">
        <h2>User Not Found</h2>
        <p>This user does not exist.</p>
      </div>
    );
  }

  // !Find the logged-in user
  const currentUser = users.find(
    (user) => user.isLoggedIn === true
  );

  // !Check if this is the current user's profile
  const isOwner = currentUser?.id === profileUser.id;

  // !Check if current user follows this profile
  const isFollowing =
    currentUser?.following?.includes(profileUser.id);

  // !Get user's posts, followers and following
  const userPosts = profileUser.posts || [];
  const userFollowers = profileUser.followers || [];
  const userFollowing = profileUser.following || [];

  // !Get followers' information
  const followersUsers = users.filter((user) =>
    userFollowers.includes(user.id)
  );

  // !Get following users' information
  const followingUsers = users.filter((user) =>
    userFollowing.includes(user.id)
  );

  // !Open edit form
  function handleEdit() {
    setName(profileUser.name || "");
    setUsername(profileUser.username || "");
    setBio(profileUser.bio || "");
    setLocation(profileUser.location || "");
    setImageProfile(profileUser.imageProfile || "");
    setCoverImage(profileUser.coverImage || "");
    setShowEdit(true);
  }

  // !Edit image
  function handleImageChange(event, setImage) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }
  // !Save profile changes
  function handleSave(event) {
    event.preventDefault();

    const updatedUsers = users.map((user) =>
      user.id === profileUser.id
        ? {
          ...user,
          name: name,
          username: username,
          bio: bio,
          location: location,
          imageProfile: imageProfile,
          coverImage: coverImage
        }
        : user
    );

    setUsers(updatedUsers);
    setShowEdit(false);
  }

  // !Follow or unfollow user
  function handleFollow() {

    if (!currentUser) return;

    const updatedUsers = users.map((user) => {

      // !Update current user's following list
      if (user.id === currentUser.id) {

        const following = user.following || [];

        return {
          ...user,
          following: isFollowing
            ? following.filter((userId) => userId !== profileUser.id)
            : [...following, profileUser.id]
        };
      }

      // !Update profile user's followers list
      if (user.id === profileUser.id) {

        const followers = user.followers || [];

        return {
          ...user,
          followers: isFollowing
            ? followers.filter((userId) => userId !== currentUser.id)
            : [...followers, currentUser.id]
        };
      }

      return user;
    });

    setUsers(updatedUsers);
  }

  return (
    <div className="profile-page">

      {/* Profile Cover */}
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

      {/* Profile Information */}
      <section className="profile-information">

        <div className="profile-avatar">

          {profileUser.imageProfile ? (
            <img
              src={profileUser.imageProfile}
              alt="Profile"
              className="profile-image"
            />
          ) : (
            <div className="default-avatar">
              {profileUser.name?.charAt(0)}
            </div>
          )}

        </div>

        <div className="profile-details">

          <h2>{profileUser.name}</h2>

          <p className="profile-username">
            @{profileUser.username}
          </p>

          <p>{profileUser.bio}</p>

          <p>{profileUser.location}</p>

        </div>

        {/* Edit or Follow Button */}
        <div className="profile-buttons">

          {isOwner ? (
            <button
              type="button"
              onClick={handleEdit}
              className="edit-button"
            >
              Edit Profile
            </button>
          ) : (
            currentUser && (
              <button
                type="button"
                onClick={handleFollow}
                className="follow-button"
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            )
          )}

        </div>

      </section>

      {/* Edit Profile Form */}
      {showEdit && (
        <form
          className="edit-profile-form"
          onSubmit={handleSave}
        >

          <h3>Edit Profile</h3>

          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label>Bio</label>
          <textarea
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />

          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />

          {/* Profile Picture */}
          <label>Profile Picture</label>

          <input
            type="file"
            accept="image/*"
            onChange={(event) =>
              handleImageChange(event, setImageProfile)
            }
          />
          {imageProfile && (
            <img
              src={imageProfile}
              alt="Profile Preview"
              className="edit-image-preview"
            />
          )}

          {/* Cover Image */}
          <label>Cover Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(event) =>
              handleImageChange(event, setCoverImage)
            }
          />

          {coverImage && (
            <img
              src={coverImage}
              alt="Cover Preview"
              className="edit-image-preview"
            />
          )}

          <div className="edit-form-buttons">
            <button type="submit">Save Changes</button>

            <button
              type="button"
              onClick={() => setShowEdit(false)}
            >
              Cancel
            </button>
          </div>

        </form>
      )}

      {/* Profile Statistics */}
      <section className="profile-stats">

        <div className="stat-item">
          <h3>{userPosts.length}</h3>
          <p>Posts</p>
        </div>

        <button
          type="button"
          className="stat-item"
          onClick={() => {
            setShowFollowers(!showFollowers);
            setShowFollowing(false);
          }}
        >
          <h3>{userFollowers.length}</h3>
          <p>Followers</p>
        </button>

        <button
          type="button"
          className="stat-item"
          onClick={() => {
            setShowFollowing(!showFollowing);
            setShowFollowers(false);
          }}
        >
          <h3>{userFollowing.length}</h3>
          <p>Following</p>
        </button>

      </section>

      {/* Followers and Following */}
      <section className="profile-connections">

        {showFollowers && (
          <div className="connections-list">

            <h3>Followers</h3>

            {followersUsers.length === 0 ? (
              <p>No followers yet.</p>
            ) : (
              followersUsers.map((user) => (
                <Link
                  to={`/profile/${user.id}`}
                  key={user.id}
                  className="connection-user"
                >

                  <div className="connection-avatar">
                    {user.imageProfile ? (
                      <img src={user.imageProfile} alt={user.name} />
                    ) : (
                      user.name?.charAt(0)
                    )}
                  </div>

                  <div>
                    <p>{user.name}</p>
                    <span>@{user.username}</span>
                  </div>

                </Link>
              ))
            )}

          </div>
        )}

        {showFollowing && (
          <div className="connections-list">

            <h3>Following</h3>

            {followingUsers.length === 0 ? (
              <p>Not following anyone yet.</p>
            ) : (
              followingUsers.map((user) => (
                <Link
                  to={`/profile/${user.id}`}
                  key={user.id}
                  className="connection-user"
                >

                  <div className="connection-avatar">
                    {user.imageProfile ? (
                      <img src={user.imageProfile} alt={user.name} />
                    ) : (
                      user.name?.charAt(0)
                    )}
                  </div>

                  <div>
                    <p>{user.name}</p>
                    <span>@{user.username}</span>
                  </div>

                </Link>
              ))
            )}

          </div>
        )}

      </section>

      {/* User Posts */}
      <section className="profile-posts">

        <h2>Posts</h2>

        {userPosts.length === 0 ? (
          <p className="no-posts">No posts yet.</p>
        ) : (
          <div className="posts-list">

            {userPosts.map((post) => (
              <div className="profile-post" key={post.id}>

                <p>{post.content}</p>

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="post-image"
                  />
                )}

                <span>{post.date}</span>

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default Profile;
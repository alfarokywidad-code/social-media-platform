import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MyContext } from "../../utils/MyContext";
import "./Profile.css";
import Post from "../Home/components/Post";

function Profile() {

  // !Get user ID from URL
  const { id } = useParams();

  // !Get data from MyContext
  const { users, setUsers, currentUser, handleFollow, handleUnfollow } = useContext(MyContext);

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

  // !Check if this is the current user's profile
  const isOwner = currentUser?.id === profileUser.id;

  // !Check if current user follows this profile
  const isFollowing =
    currentUser?.following?.includes(profileUser.id);

  // !Get user's posts, followers and following
  const userPosts = profileUser.posts || [];
  const userFollowers = profileUser.followers || [];
  const userFollowing = profileUser.following || [];

  // !Sort profile owner's posts by date
  const sortingAllUsersPosts = [...userPosts].sort((a, b) => (
    new Date(b.date) - new Date(a.date)
  ));
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
  // !Create and edit posts
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [editpostId, setEditPostId] = useState(null);
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

  // !Create or update post
  function addPosttoUsersArray(event) {
    event.preventDefault();
    if (content.trim() === "") {
      alert("write somthing");
      return;
    }

    if (!currentUser || !isOwner) return;
    const newPost = {
      id: crypto.randomUUID(),
      content: content,
      image: image,
      date: new Date().toLocaleString(),
      author: currentUser.name,
      authorId: currentUser.id,
      authorImage: currentUser.imageProfile,
      comment: [],
      likes: []
    };

    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === currentUser.id) {
          // Update existing post
          if (editpostId) {
            return {...user, posts: user.posts.map((post) => {
                if (post.id === editpostId) {
                  return {
                    ...post,
                    content: content,
                    image: image
                  };
                }
                return post;
              })
            };
          }

          // Create new post
          return { ...user, posts: [...(user.posts || []), newPost]
          };
        }
        return user;
      });
    });

    setContent("");
    setImage("");
    setEditPostId(null);
  }

  // !Get post data when clicking Edit
  function handleEditPost(post) {
    setContent(post.content);
    setImage(post.image);
    setEditPostId(post.id);

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
                onClick={() =>
                  isFollowing
                    ? handleUnfollow(currentUser.id, profileUser.id)
                    : handleFollow(currentUser.id, profileUser.id)
                }
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

      {/* Create Post - Only Profile Owner */}
      {isOwner && (
        <section className="profile-create-post">
          <div className="containerUserForm">
            <img
              className="nameAcc1"
              src={currentUser.imageProfile}
              alt="User"
            />

            <form onSubmit={addPosttoUsersArray}>

              <textarea
                onChange={(event) => setContent(event.target.value)}
                value={content}
                placeholder="What's on your mind?"
              />

              <input
                onChange={(event) => setImage(event.target.value)}
                value={image}
                type="url"
                placeholder="Add image URL"
              />

              <button className="publishBtn" type="submit">
                {editpostId ? "Update Post" : "Post"}
              </button>

            </form>
          </div>
        </section>

      )}
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
                <div className="connection-user" key={user.id}>

                  <Link
                    to={`/profile/${user.id}`}
                    className="connection-user-info"
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

                  <button
                    type="button"
                    className="unfollow-button"
                    onClick={() =>
                      handleUnfollow(currentUser.id, user.id)
                    }
                  >
                    Unfollow
                  </button>

                </div>
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
          <Post
            sortingAllUsersPosts={sortingAllUsersPosts}
            onEditPost={handleEditPost}
          />
        )}
      </section>

    </div>
  );
}

export default Profile;
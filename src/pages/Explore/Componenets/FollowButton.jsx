import "./FollowButton.css";

function FollowButton({
    isFollowing,
    onFollow,
    onUnfollow
}) {

    function handleClick() {
        if (isFollowing) {
            onUnfollow();
        } else {
            onFollow();
        }
    }

    return (
        <button
            className={
                isFollowing
                    ? "following-btn"
                    : "follow-btn"
            }
            onClick={handleClick}
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    );
}

export default FollowButton;
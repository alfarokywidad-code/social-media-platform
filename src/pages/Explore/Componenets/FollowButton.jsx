
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
                    ? "unfollow-btn"
                    : "follow-btn"
            }
            onClick={handleClick}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
}

export default FollowButton;

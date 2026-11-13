import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as outlineBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as filledBookmark } from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "../utils/MyContext";
import "./BookmarkButton.css";

export default function BookmarkButton({ postId }) {
    const { currentUser, toggleBookmark } = useContext(MyContext);
    const isSaved = currentUser?.savedPostIds?.includes(postId) ?? false;

    return (
        <button
            type="button"
            className="bookmark-button"
            aria-label="Bookmark post"
            aria-pressed={isSaved}
            disabled={!currentUser || postId == null}
            onClick={() => toggleBookmark(postId)}
        >
            <FontAwesomeIcon icon={isSaved ? filledBookmark : outlineBookmark} aria-hidden="true" />
        </button>
    );
}

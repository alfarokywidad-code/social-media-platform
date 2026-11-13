import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { MyContext } from "../utils/MyContext";

import {
    FiHome,
    FiCompass,
    FiVideo,
    FiSend,
    FiHeart,
    FiPlusSquare,
    FiUser,
    FiMenu,
    FiBookmark
} from "react-icons/fi";

function Sidebar() {

    const { currentUser } = useContext(MyContext);
    const [moreOpen, setMoreOpen] = useState(false);

    return (
        <aside className="sidebar">

            <nav className="sidebar-navigation">

                <NavLink to="/" end className="sidebar-link">
                    <FiHome />
                    <span>Home</span>
                </NavLink>

                <NavLink to="/explore" className="sidebar-link">
                    <FiCompass />
                    <span>Explore</span>
                </NavLink>

                <NavLink to="/reels" className="sidebar-link">
                    <FiVideo />
                    <span>Reels</span>
                </NavLink>

                <NavLink to="/messages" className="sidebar-link">
                    <FiSend />
                    <span>Messages</span>
                </NavLink>

                <NavLink to="/notifications" className="sidebar-link">
                    <FiHeart />
                    <span>Notifications</span>
                </NavLink>

                <NavLink to="/" className="sidebar-link">
                    <FiPlusSquare />
                    <span>Create</span>
                </NavLink>

                <NavLink
                    to={currentUser ? `/profile/${currentUser.id}` : "/login"}
                    className="sidebar-link"
                >
                    <FiUser />
                    <span>Profile</span>
                </NavLink>

            </nav>

            <div className="sidebar-bottom">

                <button
                    type="button"
                    className="sidebar-link"
                    aria-label="More"
                    aria-expanded={moreOpen}
                    aria-controls="sidebar-more-panel"
                    onClick={() => setMoreOpen((open) => !open)}
                >
                    <FiMenu aria-hidden="true" />
                    <span>More</span>
                </button>
                <div id="sidebar-more-panel" className="sidebar-more-panel" hidden={!moreOpen}>
                    <NavLink
                        to={currentUser ? "/saved-posts" : "/login"}
                        className="sidebar-link"
                        onClick={() => setMoreOpen(false)}
                    >
                        <FiBookmark aria-hidden="true" />
                        <span>Saved Posts</span>
                    </NavLink>
                </div>

            </div>

        </aside>
    );
}

export default Sidebar;

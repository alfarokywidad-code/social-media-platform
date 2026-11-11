import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
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
    FiUsers,
    FiUserCheck
} from "react-icons/fi";


function Sidebar() {

    const {users} = useContext(MyContext);
    const currentUser = users.find((user) => user.isLoggedIn === true);

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

                <NavLink to="/create" className="sidebar-link">
                    <FiPlusSquare />
                    <span>Create</span>
                </NavLink>

                <NavLink to={currentUser ? `/profile/${currentUser.id}` : "/login"} className="sidebar-link">
                    <FiUser />
                    <span>Profile</span>
                </NavLink>

                <NavLink to="/followers" className="sidebar-link">
                    <FiUsers />
                    <span>Followers</span>
                </NavLink>

                <NavLink to="/following" className="sidebar-link">
                    <FiUserCheck />
                    <span>Following</span>
                </NavLink>

            </nav>


            <div className="sidebar-bottom">

                <button className="sidebar-link">
                    <FiMenu />
                    <span>More</span>
                </button>

            </div>

        </aside>
    );
}
export default Sidebar;
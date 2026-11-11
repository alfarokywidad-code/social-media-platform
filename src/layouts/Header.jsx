import "./Header.css";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import {
    FiSearch,
    FiSend,
    FiHeart,
    FiLogIn,
    FiLogOut,
    FiUser
} from "react-icons/fi";
import { MyContext } from "../utils/MyContext";

function Header() {
    const navigate = useNavigate();
    const { users, search, setSearch, currentUser } = useContext(MyContext);
    const isLoggedIn = currentUser?.isLoggedIn === true;
    // const currentUser = users.find(
    // (user) => user.isLoggedIn === true
    // );

    
    function handleSearch(event) {
        const value = event.target.value;
        setSearch(value);

        navigate("/Explore");

    }

    return (
        <header className="header">

            <div className="header-search">
                <FiSearch />
                <input
                    type="text"
                    placeholder="Search people, posts..."
                    aria-label="Search"
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            <div className="header-actions">
                <NavLink
                    to="/messages"
                    aria-label="Messages"
                    title="Messages"
                >
                    <FiSend />
                </NavLink>
                <NavLink
                    to="/notifications"
                    aria-label="Notifications"
                    title="Notifications"
                >
                    <FiHeart />
                </NavLink>
                {currentUser && (
                    <NavLink
                        to={`/profile/${currentUser.id}`}
                        className="header-avatar"
                        aria-label="My profile"
                    >
                        {currentUser.imageProfile ? (


                            <img
                                src={currentUser.imageProfile}
                                alt={`{currentUser.username} profile`}
                                className="profile-image"
                            />
                        )
                            : (<span>{currentUser.username.charAt(0).toUpperCase() || <FiUser />}</span>)
                        }

                    </NavLink>)}
                <NavLink
                    to={isLoggedIn ? "/LogOut" : "/LogIn"}
                    title={isLoggedIn ? "LogOut" : "LogIn"}
                    aria-label={isLoggedIn ? "LogOut" : "LogIn"}
                    className="icoun-LogIn-LogOut">
                    {currentUser.isLoggedIn ? <FiLogOut /> : <FiLogIn />}


                </NavLink>
            </div>

        </header>
    );
}

export default Header;
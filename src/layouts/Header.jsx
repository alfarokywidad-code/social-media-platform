
import "./Header.css";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext, useState } from "react";

import {
    FiSearch,
    FiSend,
    FiHeart,
    FiLogIn,
    FiLogOut,
    FiUser,
    FiMenu,
    FiX
} from "react-icons/fi";

import { MyContext } from "../utils/MyContext";
import logo from "../Assests/molengeekIcon.png";

function Header() {
    const navigate = useNavigate();

    const { search, setSearch, currentUser } = useContext(MyContext);

    const [menuOpen, setMenuOpen] = useState(false);

    const isLoggedIn = currentUser?.isLoggedIn === true;

    function handleSearch(event) {
        const value = event.target.value;
        setSearch(value);
        navigate("/explore");
    }

    function handleLogout() {
        setMenuOpen(false);
        navigate("/logout");
    }

    return (
        <header className="header">

            {/* Logo */}
            <div className="header-logo">
                <NavLink to="/" aria-label="MolenGeek Home">
                    <div className="header-logo-icon">
                        <img src={logo} alt="MolenGeek Logo" />
                    </div>

                    <div className="header-logo-text">
                        <span className="header-logo-name">
                            <span className="header-logo-molen">Molen</span>
                            <span className="header-logo-geek">Geek</span>
                        </span>

                        <span className="header-logo-subtitle">
                            SOCIAL COMMUNITY
                        </span>
                    </div>
                </NavLink>
            </div>

            {/* Search */}
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

            {/* Desktop Actions */}
            <div className="header-actions">

                <NavLink to="/messages" aria-label="Messages">
                    <FiSend />
                </NavLink>

                <NavLink to="/notifications" aria-label="Notifications">
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
                                alt="Profile"
                            />
                        ) : (
                            <span>
                                {currentUser.username
                                    ? currentUser.username.charAt(0).toUpperCase()
                                    : <FiUser />
                                }
                            </span>
                        )}
                    </NavLink>
                )}

                <NavLink
                    to={isLoggedIn ? "/logout" : "/login"}
                    className="icoun-LogIn-LogOut"
                    aria-label={isLoggedIn ? "LogOut" : "LogIn"}
                >
                    {isLoggedIn ? <FiLogOut /> : <FiLogIn />}
                </NavLink>

            </div>

            {/* Mobile Burger Button */}
            <button
                className="mobile-menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
            >
                {menuOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="mobile-menu">

                    {currentUser && (
                        <NavLink
                            to={`/profile/${currentUser.id}`}
                            className="mobile-menu-profile"
                            onClick={() => setMenuOpen(false)}
                        >
                            <div className="mobile-profile-avatar">
                                {currentUser.imageProfile ? (
                                    <img
                                        src={currentUser.imageProfile}
                                        alt="Profile"
                                    />
                                ) : (
                                    <span>
                                        {currentUser.username?.charAt(0).toUpperCase() || <FiUser />}
                                    </span>
                                )}
                            </div>

                            <div className="mobile-profile-info">
                                <strong>{currentUser.username || "User"}</strong>
                                <span>View Profile</span>
                            </div>
                        </NavLink>
                    )}

                    <button
                        className="mobile-menu-logout"
                        onClick={handleLogout}
                    >
                        <FiLogOut />
                        <span>Logout</span>
                    </button>

                </div>
            )}

        </header>
    );
}

export default Header;


import "./Header.css";

import {
    useNavigate,
    NavLink,
    useLocation
} from "react-router-dom";

import {
    useContext,
    useState,
    useEffect
} from "react";

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
    const location = useLocation();

    const { currentUser } = useContext(MyContext);

    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    const isLoggedIn = currentUser?.isLoggedIn === true;

    function handleSearch(event) {
        const value = event.target.value;

        setSearch(value);

        if (location.pathname !== "/explore") {
            navigate("/explore");
        }
    }

    function closeMobileSearch() {
        setMobileSearchOpen(false);
        setSearch("");
    }

    function handleLogout() {
        setMenuOpen(false);
        navigate("/logout");
    }

    function handleMobileSearchBlur(event) {
        const nextElement = event.relatedTarget;

        if (
            !event.currentTarget.parentElement.contains(nextElement)
        ) {
            closeMobileSearch();
        }
    }

    // Close menu after navigation
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
        <header className="header">

            {/* Logo */}
            <div className="header-logo">
                <NavLink
                    to="/"
                    aria-label="MolenGeek Home"
                    onClick={closeMobileSearch}
                >
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

            {/* Desktop Search */}
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

                <NavLink
                    to="/messages"
                    aria-label="Messages"
                    onClick={closeMobileSearch}
                >
                    <FiSend />
                </NavLink>

                <NavLink
                    to="/notifications"
                    aria-label="Notifications"
                    onClick={closeMobileSearch}
                >
                    <FiHeart />
                </NavLink>

                {currentUser && (
                    <NavLink
                        to={`/profile/${currentUser.id}`}
                        className="header-avatar"
                        aria-label="My profile"
                        onClick={closeMobileSearch}
                    >
                        {currentUser.imageProfile ? (
                            <img
                                src={currentUser.imageProfile}
                                alt="Profile"
                            />
                        ) : (
                            <span>
                                {currentUser.username
                                    ? currentUser.name.charAt(0).toUpperCase()
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
                    onClick={closeMobileSearch}
                >
                    {isLoggedIn ? <FiLogOut /> : <FiLogIn />}
                </NavLink>

            </div>

            {/* Mobile Search Button */}
            <button
                className="mobile-search-button"
                onClick={() => {
                    if (mobileSearchOpen) {
                        closeMobileSearch();
                    } else {
                        setMobileSearchOpen(true);
                    }
                }}
                aria-label="Toggle search"
                aria-expanded={mobileSearchOpen}
            >
                {mobileSearchOpen ? <FiX /> : <FiSearch />}
            </button>

            {/* Mobile Menu Button */}
            <button
                className="mobile-menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
            >
                {menuOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Mobile Search */}
            {mobileSearchOpen && (
                <div className="mobile-search-overlay">
                    <div className="mobile-search-box">
                        <FiSearch />

                        <input
                            type="text"
                            placeholder="Search people, posts..."
                            aria-label="Search"
                            value={search}
                            onChange={handleSearch}
                            onBlur={handleMobileSearchBlur}
                            autoFocus
                        />

                        <button
                            onClick={closeMobileSearch}
                            aria-label="Close search"
                        >
                            <FiX />
                        </button>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="mobile-menu">

                    {currentUser && (
                        <NavLink
                            to={`/profile/${currentUser.id}`}
                            className="mobile-menu-profile"
                            onClick={closeMobileSearch}
                        >
                            <div className="mobile-profile-avatar">
                                {currentUser.imageProfile ? (
                                    <img
                                        src={currentUser.imageProfile}
                                        alt="Profile"
                                    />
                                ) : (
                                    <span>
                                        {currentUser.name?.charAt(0).toUpperCase()
                                            || <FiUser />
                                        }
                                    </span>
                                )}
                            </div>

                            <div className="mobile-profile-info">
                                <strong>
                                    {currentUser.username || "User"}
                                </strong>

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

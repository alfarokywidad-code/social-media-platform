import "./Header.css";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import {
    FiSearch,
    FiPlusSquare,
    FiSend,
    FiHeart,
    FiLogIn,
    FiLogOut
} from "react-icons/fi";
// import MyContext from "../Until/MyContext";

function Header() {
    const { search, setSearch } = useContext(MyContext);
    const navigate = useNavigate();

    function handleSearch(event) {
        const value = event.target.value;
        setSearch(value);

        navigate("/Explore");

    }

    return (
        <header className="header">
            {/* <div className="header-logo">
                <Link to="/">
                    logoMoleenGeek
                </Link>
            </div> */}

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
                {/* <button
                    type="button"
                    aria-label="Create post"
                    title="Create post"
                >
                    <FiPlusSquare />
                </button> */}
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
                <NavLink
                    to="/profile"
                    className="header-avatar"
                    aria-label="My profile"
                >
                    Walid
                </NavLink>
                <NavLink
                    to={isLoggedIn ? "/LogOut" : "/LogIn"}
                    title={isLoggedIn ? "LogOut" : "LogIn"}
                    aria-label={isLoggedIn ? "LogOut" : "LogIn"}
                    className="icoun-LogIn-LogOut">
                    {isLoggedIn ? <FiLogOut /> : <FiLogIn />}


                </NavLink>
            </div>

        </header>
    );
}

export default Header;
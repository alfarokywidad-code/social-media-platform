import './App.css';
import { useContext, useState } from 'react';
import {
    Route,
    Routes,
    Navigate,
    useLocation
} from 'react-router-dom';

import { FiMenu, FiChevronLeft } from 'react-icons/fi';

import { MyContext } from './utils/MyContext';

import ErrorPage from './pages/Error/Error';
import Home from './pages/Home/Home';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';

import LogIn from './pages/LogInOut/components/LogIn';
import SignUp from './pages/LogInOut/components/SignUp';




import Post from './pages/Home/components/Post'
import Logout from './pages/LogInOut/components/Logout';

import Explore from './pages/Explore/Explore';
import Profile from './pages/Profile/Profile';

function App() {
    const { currentUser } = useContext(MyContext);

    const location = useLocation();

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const isAuthPage =
        location.pathname === '/login' ||
        location.pathname === '/sign';

    const isProfilePage = location.pathname.startsWith('/profile/');

    const isLoggedIn = currentUser?.isLoggedIn === true;

    const isSidebarCollapsed = isProfilePage && sidebarCollapsed;

    function handleSidebarToggle() {
        setSidebarCollapsed(prev => !prev);
    }

    return (
        <div className={`app-layout ${isAuthPage ? 'auth-layout' : ''} ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>

            {!isAuthPage && <Sidebar />}

            <div className="app-right">

                {!isAuthPage && <Header />}

                {isProfilePage && (
                    <button
                        className="sidebar-toggle"
                        onClick={handleSidebarToggle}
                        aria-label={sidebarCollapsed ? 'Open sidebar' : 'Close sidebar'}
                        title={sidebarCollapsed ? 'Open sidebar' : 'Close sidebar'}
                    >
                        {sidebarCollapsed ? <FiMenu /> : <FiChevronLeft />}
                    </button>
                )}

                <main className="main-content">
                    <Routes>
                        <Route
                            path="/"
                            element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
                        />

                        <Route
                            path="/login"
                            element={!isLoggedIn ? <LogIn /> : <Navigate to="/" replace />}
                        />

                        <Route
                            path="/sign"
                            element={!isLoggedIn ? <SignUp /> : <Navigate to="/" replace />}
                        />

                        <Route path="/logout" element={<Logout />} />

                        <Route
                            path="/profile/:id"
                            element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
                        />

                        <Route path="/explore" element={<Explore />} />
                        <Route path="/post" element={<Post />} />

                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </main>

            </div>
        </div>
    );
}

export default App;

import './App.css';

import { useContext } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import { MyContext } from './utils/MyContext';

import ErrorPage from './pages/Error/Error';
import Home from './pages/Home/Home';
import Explore from './pages/Explore/Explore';
import Following from './pages/Following/Following';
import Followers from './pages/Followers/Followers';

import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Footer from './layouts/Footer';

import LogIn from './pages/LogInOut/components/LogIn';
import SignUp from './pages/LogInOut/components/SignUp';
import Logout from './pages/LogInOut/components/Logout';

function App() {
    const { users } = useContext(MyContext);
    const location = useLocation();

    const currentUser = users.find(
        (user) => user.isLoggedIn === true
    );

    const isAuthPage =
        location.pathname === '/login' ||
        location.pathname === '/sign';

    return (
        <div className="app-layout">

            {!isAuthPage && <Sidebar />}

            <div className="app-right">

                {!isAuthPage && <Header />}

                <main className="main-content">
                    <Routes>
                        <Route path="/login" element={<LogIn />} />

                        <Route path="/sign" element={<SignUp />} />

                        <Route
                            path="/"
                            element={
                                currentUser
                                    ? <Home />
                                    : <Navigate to="/login" replace />
                            }
                        />

                        <Route path="/Explore" element={
                            currentUser
                                ? <Explore />
                                : <Navigate to='/login' replace />} />

                        <Route path="/following" element={
                            currentUser
                                ? <Following />
                                : <Navigate to='/login' replace />} />

                        <Route path="/followers" element={
                            currentUser
                                ? <Followers />
                                : <Navigate to='/login' replace />} />


                        <Route path="/logout" element={
                            <Logout/>} />


                        <Route path="*" element={
                            <ErrorPage />} />

                    </Routes>
                </main>

                {!isAuthPage && <Footer />}

            </div>

        </div>
    );
}

export default App;

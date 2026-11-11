import './App.css';
import ErrorPage from './pages/Error/Error';
import Home from './pages/Home/Home'
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import LogIn from './pages/LogInOut/components/Login';
import SignUp from './pages/LogInOut/components/SignUp';
import { useContext } from 'react';
import { MyContext } from './utils/MyContext';
import { useLocation } from 'react-router-dom';
import Explore from './pages/Explore/Explore';

import Profile from './pages/Profile/Profile';


function App() {
    const { users,currentUser } = useContext(MyContext);
    const location = useLocation();
    // const Y = location.pathname === '/LogIn' || location.pathname === '/sign' || location.pathname === '/login'
   
    const isAuthPage =
        location.pathname === '/login' ||
        location.pathname === '/sign';

    // const X = users.find((user) => user.isLoggedIn === true)


    return (
        <div className="app-layout">

            {isAuthPage && <Sidebar />}

            <div className="app-right">

                {/* <Header /> */}
                {/* <Home/> */}
                {isAuthPage && <Header />}

                <main className="main-content">
                    <Routes>
                        {/* // login هنا في الكود أسفله مكان الـ,(Home)عندما تقومون بإنشاء صفحة الرئيسية ،  */}
                        <Route path='/' element={currentUser ? <Home /> : <Navigate to='/login' replace />} />
                        {/*  */}
                        <Route path='/login' element={<LogIn />} />
                        <Route path='/sign' element={<SignUp />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </main>

            </div>

        </div>
    );
}

export default App;
import './App.css';
import ErrorPage from './pages/Error/Error';
import { Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import LogIn from './pages/LogInOut/components/Login';
import SignUp from './pages/LogInOut/components/SignUp';



function App() {
    return (
        <div className="app-layout">

            <Sidebar />

            <div className="app-right">

                <Header />

                <main className="main-content">
                    <Routes>
                      <Route   path='/Sign' element={<SignUp/>}/>
                        <Route path="*" element={<ErrorPage />} />
                       <Route path='/login' element={<LogIn/>}/>
                    </Routes>
                </main>

            </div>

        </div>
    );
}

export default App;
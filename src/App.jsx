import './App.css';
import ErrorPage from './pages/Error/Error';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';


function App() {
    return (
        <div className="app-layout">

            <Sidebar />

            <div className="app-right">

                <Header />

                <main className="main-content">
                    <Routes>
                        <Route path="*" element={<ErrorPage />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>

            </div>

        </div>
    );
}

export default App;
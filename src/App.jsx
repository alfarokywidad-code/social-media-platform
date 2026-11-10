import './App.css';
import ErrorPage from './pages/Error/Error';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Footer from './layouts/Footer';
import Explore from "./pages/Explore/Explore"
import Following from './pages/Following/Following';
import Followers from './pages/Followers/Followers';

function App() {
    return (
        <div className="app-layout">

            <Sidebar />

            <div className="app-right">

                <Header />
                <Home/>
                <main className="main-content">
                    <Routes>
                    
                        <Route path="*" element={<ErrorPage />} />
                        
                        <Route path="/Explore" element={<Explore />} />
                        <Route path="/following" element={<Following />} />
                        <Route path="/followers" element={<Followers />} />
                    
                    </Routes>
                </main>

                <Footer />

            </div>

        </div>
    );
}

export default App;
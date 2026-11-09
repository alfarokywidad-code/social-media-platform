import './App.css';
import ErrorPage from './pages/Error/Error';
import { Route, Routes } from 'react-router-dom';
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
                    </Routes>
                </main>

            </div>

        </div>
    );
}

export default App;
import './App.css';
import ErrorPage from './pages/Error/Error';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/Home';

function App() {
  return (

      <Routes >
        <Route path='/' element={<HomePage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes >

  );
}

export default App;

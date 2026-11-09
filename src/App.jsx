import './App.css';
import ErrorPage from './pages/Error/Error';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'

function App() {
  return (

      <Routes >
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes >

  );
}

export default App;

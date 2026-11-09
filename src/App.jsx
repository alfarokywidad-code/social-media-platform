import './App.css';
import ErrorPage from './pages/Error/Error';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (

      <Routes >
        <Route path='*' element={<ErrorPage/>}/>
      </Routes >

  );
}

export default App;

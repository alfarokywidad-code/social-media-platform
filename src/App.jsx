import './App.css';
import ErrorPage from './pages/Error/Error';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/LogInOut/components/SignUp';
import LogIn from './pages/LogInOut/components/Login';

function App() {
  return (
<>
  
<Routes>
<Route   path='/Sign' element={<SignUp/>}/>
<Route path='*' element={<ErrorPage/>}/> 
<Route path='/login' element={<LogIn/>}/> 
</Routes>
</>


   
  

  );
}

export default App;

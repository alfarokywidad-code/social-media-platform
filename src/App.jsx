import './App.css';
import ErrorPage from './pages/Error/Error';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/LogInOut/components/SignUp';

function App() {
  return (

      <BrowserRouter>
<Routes>
<Route   path='/Sign' element={<SignUp/>}/>
<Route path='*' element={<ErrorPage/>}/>
</Routes>
    </BrowserRouter>
   
  

  );
}

export default App;

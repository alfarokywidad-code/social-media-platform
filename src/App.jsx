import './App.css';
import { BrowserRouter,Link, Route,Routes } from 'react-router-dom';
import SignUp from './pages/LogInOut/components/SignUp';
function App() {
  return (
    <BrowserRouter>
<Routes>
<Route   path='/Sign' element={<SignUp/>}/>
</Routes>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import {Route, Routes, Navigate} from 'react-router-dom';
import { useUserContext } from './hooks/useUserContext';
import LoginRegister from './components/LoginRegister';
import Dashboard from './views/Dashboard';
import BookDetails from './components/BookDetails';

function App() {
  const {user} = useUserContext();
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={!user? <LoginRegister /> : <Navigate to='/dashboard' />}/>
        <Route path='/dashboard' element={user? <Dashboard /> : <Navigate to='/' />}/>
        <Route path='/book/:id' element={user? <BookDetails /> : <Navigate to='/' />}/>
      </Routes>
    </div>
  );
}

export default App;

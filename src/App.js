import './App.css';
import SignUp from './component/SignUp';
import { Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Welcome from './component/Welcome';

function App() {
  return (
    
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
  );
}

export default App;

import './App.css';
import SignUp from './component/SignUp';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Welcome from './component/Welcome';
import MailBox from './component/MailBox';
import ComposeMail from './component/ComposeMail';
import SentMail from './component/SentMail';

function App() {
  return (
    
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/mailbox" element={<MailBox />} />
        <Route path="/composemail" element={<ComposeMail />} />
        <Route path="/sentmail" element={<SentMail />} />
        <Route path="*" element={<Navigate replace to="/mailbox" />}></Route>
      </Routes>
  );
}

export default App;

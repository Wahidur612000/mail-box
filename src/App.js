import './App.css';
import SignUp from './component/SignUp';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import MailBox from './component/MailBox';
import ComposeMail from './component/ComposeMail';
import SentMail from './component/SentMail';
import Inbox from './component/Inbox';
import UnreadMails from './component/UnreadMails';

function App() {
  return (
    
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mailbox" element={<MailBox />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/composemail" element={<ComposeMail />} />
        <Route path="/sentmails" element={<SentMail />} />
        <Route path="/unreadmails" element={<UnreadMails />} />
        <Route path="*" element={<Navigate replace to="/inbox" />}></Route>
      </Routes>
  );
}

export default App;

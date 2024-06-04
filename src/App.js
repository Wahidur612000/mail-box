import "./App.css";
import SignUp from "./components/SignUp";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import MailBox from "./components/MailBox";
import ComposeMail from "./components/ComposeMail";
import SentMail from "./components/SentMail";
import Inbox from "./components/Inbox";
import UnreadMails from "./components/UnreadMails";

function App() {
  const isLoggedIn = localStorage.getItem("login");
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      {isLoggedIn && <Route path="/mailbox" element={<MailBox />} />}
      {isLoggedIn && <Route path="/inbox" element={<Inbox />} />}
      {isLoggedIn && <Route path="/composemail" element={<ComposeMail />} />}
      {isLoggedIn && <Route path="/sentmails" element={<SentMail />} />}
      {isLoggedIn && <Route path="/unreadmails" element={<UnreadMails />} />}
      <Route path="*" element={<Navigate replace to="/inbox" />}></Route>
    </Routes>
  );
}

export default App;

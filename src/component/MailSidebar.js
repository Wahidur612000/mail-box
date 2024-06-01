import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPaperPlane,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { logout } from "./Store/AuthSlice";
import { useNavigate } from "react-router-dom";

const MailSidebar = () => {
  const [inboxCount, setInboxCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMailCounts = async () => {
      try {
        const emailId = localStorage.getItem("email");
        setEmail(emailId);

        const firebaseemail = emailId.replace(/[.]/g, "");
        const inboxResponse = await fetch(
          `https://mailbox-50f1d-default-rtdb.asia-southeast1.firebasedatabase.app/inbox.json`
        );
        const sentResponse = await fetch(
          `https://mailbox-50f1d-default-rtdb.asia-southeast1.firebasedatabase.app/emails/${firebaseemail}.json`
        );

        if (!inboxResponse.ok || !sentResponse.ok) {
          throw new Error("Failed to fetch mail data.");
        }

        const inboxData = await inboxResponse.json();
        const sentData = await sentResponse.json();

        if (inboxData) {
          const inboxArray = Object.keys(inboxData).map((key) => ({
            id: key,
            ...inboxData[key],
          }));
          setInboxCount(inboxArray.length);
          const unreadMails = inboxArray.filter((mail) => !mail.hasRead);
          setUnreadCount(unreadMails.length);
        }

        if (sentData) {
          const sentArray = Object.keys(sentData).map((key) => ({
            id: key,
            ...sentData[key],
          }));
          setSentCount(sentArray.length);
        }
      } catch (error) {
        console.error("Error fetching mail data:", error);
      }
    };

    const intervalId = setInterval(fetchMailCounts, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
      <Button
        variant="success"
        style={{ width: "130px", marginTop: "20px" }}
        href="/composemail"
      >
        Compose
      </Button>
      <div className="sidebar bg-primary text-dark p-3" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ListGroup variant="flush" style={{ flex: 1 }}>
          <ListGroup.Item className="bg-primary border-0">
            <a href="/inbox" className="text-light" style={{ textDecoration: "none" }}>
              <FontAwesomeIcon icon={faEnvelope} />&nbsp; Inbox ({inboxCount})
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0">
            <a href="/unreadmails" className="text-light" style={{ textDecoration: "none" }}>
              <FontAwesomeIcon icon={faEyeSlash} />&nbsp; Unread ({unreadCount})
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0">
            <a href="/sentmail" className="text-light" style={{ textDecoration: "none" }}>
              <FontAwesomeIcon icon={faPaperPlane} />&nbsp; Sent ({sentCount})
            </a>
          </ListGroup.Item>
        </ListGroup>
        <div style={{ marginTop: 'auto'}}>
          <div className="d-flex align-items-center text-light mb-2">
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
            <span>{email}</span>
          </div>
          <Button variant="outline-light"  onClick={handleLogout} style={{ textDecoration: "none" }}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MailSidebar;

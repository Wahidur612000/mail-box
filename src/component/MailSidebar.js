import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faStar,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const MailSidebar = () => {
  const [inboxCount, setInboxCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [sentCount, setSentCount] = useState(0);

  useEffect(() => {
    const fetchMailCounts = async () => {
      try {
        const inboxResponse = await fetch(
          `https://mailbox-50f1d-default-rtdb.asia-southeast1.firebasedatabase.app/inbox.json`
        );
        const emailId = localStorage.getItem("email");
        const firebaseemail = emailId.replace(/[.]/g, "");
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

  return (
    <div>
      <Button
        variant="success"
        style={{ width: "130px", marginTop: "20px" }}
        href="/composemail"
      >
        Compose
      </Button>
      <div className="sidebar bg-primary text-dark p-3">
        <ListGroup variant="flush">
          <ListGroup.Item className="bg-primary border-0">
            <a href="/inbox" className="text-light">
              <FontAwesomeIcon icon={faEnvelope} /> Inbox ({inboxCount})
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0">
            <a href="/mailbox" className="text-light">
              <FontAwesomeIcon icon={faStar} /> Starred
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0">
            <a href="/inbox" className="text-light">
              <FontAwesomeIcon icon={faEnvelope} /> Unread ({unreadCount})
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0">
            <a href="/sentmail" className="text-light">
              <FontAwesomeIcon icon={faPaperPlane} /> Sent ({sentCount})
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0">
            <a href="/mailbox" className="text-light">
              <FontAwesomeIcon icon={faTrash} /> Delete
            </a>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

export default MailSidebar;

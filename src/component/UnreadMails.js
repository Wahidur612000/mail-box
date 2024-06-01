import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import MailBox from "./MailBox";
import useApi from "./Hooks/useApi";

const UnreadMails = () => {
  const [unreadMails, setUnreadMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);

  const [inboxmails] = useApi(`https://mailbox-50f1d-default-rtdb.asia-southeast1.firebasedatabase.app/inbox.json`);

  useEffect(() => {
    if (Array.isArray(inboxmails)) {
      const unread = inboxmails.filter(mail => !mail.hasRead);
      setUnreadMails(unread);
    }
  }, [inboxmails]);

  const handleItemClick = async (mail) => {
    try {
      await fetch(
        `https://mailbox-50f1d-default-rtdb.asia-southeast1.firebasedatabase.app/inbox/${mail.id}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hasRead: true }),
        }
      );

      setUnreadMails(prevUnreadMails =>
        prevUnreadMails.filter(m => m.id !== mail.id)
      );
      setSelectedMail(mail);
    } catch (error) {
      console.error("Error updating mail read status:", error);
    }
  };

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    try {
      await fetch(
        `https://mailbox-50f1d-default-rtdb.asia-southeast1.firebasedatabase.app/inbox/${id}.json`,
        {
          method: "DELETE",
        }
      );

      setUnreadMails(unreadMails.filter(mail => mail.id !== id));
      if (selectedMail && selectedMail.id === id) {
        setSelectedMail(null);
      }
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  return (
    <MailBox>
      {selectedMail ? (
        <Card className="mt-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title>From: {selectedMail.from}</Card.Title>
                <Card.Subtitle className="mb-2">
                  To: {selectedMail.to}
                </Card.Subtitle>
              </div>
              <div>{selectedMail.timestamp}</div>
            </div>
            <Card.Text>Subject: {selectedMail.subject}</Card.Text>
            <Card.Text>{selectedMail.editorContent}</Card.Text>
            <div>
              <Button variant="primary" onClick={() => setSelectedMail(null)}>
                Back
              </Button>
              <Button
                variant="link"
                className="text-danger"
                onClick={(event) => handleDelete(selectedMail.id, event)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </Card.Body>
        </Card>
      ) : (
        Array.isArray(unreadMails) &&
        unreadMails.map(mail => (
          <Card
            key={mail.id}
            className="mt-3"
            onClick={() => handleItemClick(mail)}
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "blue",
                    marginRight: "10px",
                  }}
                ></div>
                <Card.Title className="mb-0 mr-3">{mail.to}</Card.Title>
              </div>
              <Card.Subtitle className="mb-0 text-center">
                {mail.subject}
              </Card.Subtitle>
              <Button
                variant="link"
                className="text-danger"
                onClick={(event) => handleDelete(mail.id, event)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </MailBox>
  );
};

export default UnreadMails;

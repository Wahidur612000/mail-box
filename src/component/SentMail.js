import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import MailBox from "./MailBox";

const SentMails = () => {
  const [sentMails, setSentMails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSentMails = async () => {
      try {
        const emailId = localStorage.getItem("email");
        const firebaseemail = emailId.replace(/[.]/g, "");

        const response = await fetch(
          `https://mailbox-50f1d-default-rtdb.asia-southeast1.firebasedatabase.app/emails/${firebaseemail}.json`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch sent mails.");
        }

        const data = await response.json();

        if (data) {
          const sentMailsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setSentMails(sentMailsArray);
        } else {
          setSentMails([]);
        }
      } catch (error) {
        console.error("Error fetching sent mails:", error);
      }
    };

    fetchSentMails();
  }, []);

  

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    try {
      const emailId = localStorage.getItem("email");
      const firebaseemail = emailId.replace(/[.]/g, "");

      await fetch(
        `https://mailbox-50f1d-default-rtdb.asia-southeast1.firebasedatabase.app/emails/${firebaseemail}/${id}.json`,
        {
          method: "DELETE",
        }
      );

      setSentMails(sentMails.filter((mail) => mail.id !== id));
      if (selectedMail && selectedMail.id === id) {
        setSelectedMail(null); 
      }
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  return (
    <MailBox>
      {
        sentMails.map((mail) => (
          <Card
            key={mail.id}
            className="mt-3"
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Card.Title className="mb-0 mr-3">{mail.to}</Card.Title>
              </div>
              <Card.Subtitle className="mb-0 text-center">{mail.subject}</Card.Subtitle>
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
      }
    </MailBox>
  );
};

export default SentMails;

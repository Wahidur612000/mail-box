import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faStar,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function MailSidebar() {
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
              <FontAwesomeIcon icon={faEnvelope} /> Inbox
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0">
            <a href="/mailbox" className="text-light">
              <FontAwesomeIcon icon={faStar} /> Starred
            </a>
          </ListGroup.Item>
          <ListGroup.Item className="bg-primary border-0">
            <a href="/sentmail" className="text-light">
              <FontAwesomeIcon icon={faPaperPlane} /> Sent
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
}

export default MailSidebar;

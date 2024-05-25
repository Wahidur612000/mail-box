import React from "react";
import MailHeader from "./MailHeader";
import { Container, Row, Col, Button } from "react-bootstrap";
import MailSidebar from "./MailSidebar";
import { useLocation } from "react-router-dom";

const MailBox = ({ children }) => {

    const location = useLocation();

  return (
    <Container fluid>
      <Row>
        <Col md={12} >
          <MailHeader />
        </Col>
      </Row>
      <Row>
        <Col md={2} className="bg-primary min-vh-100">
          <MailSidebar />
        </Col>
        <Col md={10} className="p-3">
        {location.pathname === "/mailbox" && (
            <h3 className="d-flex justify-content-center align-items-center">
              No Inbox mail available
            </h3>
          )}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default MailBox;

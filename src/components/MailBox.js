import React from "react";
import MailHeader from "./MailHeader";
import { Container, Row, Col } from "react-bootstrap";
import MailSidebar from "./MailSidebar";

const MailBox = ({ children }) => {

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
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default MailBox;

import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import MailBox from "./MailBox";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ComposeMail = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const emailId = localStorage.getItem("email");
    setFrom(emailId || "");
  }, []);

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSend = () => {
    const editorContent = editorState.getCurrentContent().getPlainText();
    const firebaseemail = from.replace(/[.]/g, "");
    const timestamp = new Date().toLocaleString();

    const emailData = {
      from,
      to,
      subject,
      editorContent,
      timestamp,
    };

    fetch(
      `https://mailbox-50f1d-default-rtdb.asia-southeast1.firebasedatabase.app/emails/${firebaseemail}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setTo("");
        setSubject("");
        navigate("/sentmail");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <MailBox>
      <Card className="mt-3">
        <Card.Body>
          <Row className="justify-content-center">
            <Col md={12}>
              <Form>
                <Form.Group controlId="formFrom">
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Your email"
                    value={from}
                    readOnly
                  />
                </Form.Group>
                <Form.Group controlId="formTo">
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter recipient's email"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </Form.Group>
                <Editor
                  toolbarClassName="py-3 border-bottom bg-light"
                  wrapperClassName="card mt-3"
                  editorClassName="card-body pt-0"
                  editorStyle={{ minHeight: "20rem" }}
                  editorState={editorState}
                  onEditorStateChange={handleEditorStateChange}
                  options={{}}
                />
                <Button variant="primary" onClick={handleSend}>
                  Send
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </MailBox>
  );
};

export default ComposeMail;

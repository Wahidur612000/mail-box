import React from 'react';
import { ListGroup,Button } from 'react-bootstrap';

function MailSidebar() {
  return (
    <div><Button variant="success" style={{width:"130px",marginTop:"20px"}} href='/composemail'>
    Compose
  </Button>
    <div className="sidebar bg-primary text-dark p-3">
      <ListGroup variant="flush">
        <ListGroup.Item className="bg-primary text-dark border-0">
          <a href='/mailbox' className='text-light'>&#9993; Inbox</a>
        </ListGroup.Item>
        <ListGroup.Item className="bg-primary text-dark border-0">
         Starred
        </ListGroup.Item>
        <ListGroup.Item className="bg-primary text-dark border-0">
           Sent
        </ListGroup.Item>
        <ListGroup.Item className="bg-primary text-dark border-0">
          Trash
        </ListGroup.Item>
      </ListGroup>
    </div>
    </div>
  );
}

export default MailSidebar;






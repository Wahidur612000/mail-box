import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { useDispatch } from 'react-redux';
import { logout } from "./Store/AuthSlice";
import { useNavigate } from "react-router-dom";


const MailHeader = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

  return (
    <div className="mb-4 bg-primary d-flex align-items-center px-3" style={{ height: "70px" }}>
    <h3 className="text-white mb-0">Yahoo Mail</h3>
    <InputGroup className="w-50 mx-auto">
      <Form.Control
        placeholder="Search mail"
        aria-label="Search mail"
      />
      <Button variant="outline-light">
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </InputGroup>
    <Button variant="outline-light" onClick={logoutHandler}>Logout</Button>
  </div>
  );
};

export default MailHeader;
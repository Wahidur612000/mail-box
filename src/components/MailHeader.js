import React from "react";
import {  Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { logout } from "../store/AuthSlice";
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
    <Button variant="outline-light" onClick={logoutHandler} className="ms-auto" >Logout</Button>
  </div>
  );
};

export default MailHeader;
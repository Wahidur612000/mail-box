import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button"; 
import { useDispatch } from 'react-redux';
import { login } from "../store/AuthSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABaG4S_aphDMO1LCWGC_o8rfNrqtaDdgw",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.idToken);
        localStorage.setItem('email',email)
        localStorage.setItem('login',"true")
        dispatch(login());
        navigate('/inbox');
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div style={{
      backgroundImage: "url('https://t4.ftcdn.net/jpg/05/71/83/47/360_F_571834789_ujYbUnH190iUokdDhZq7GXeTBRgqYVwa.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    }}>
      <div
        className="row justify-content-center"
      >
        <div className="col-md-4">
          <div className="card" style={{marginTop:"100px",width:"80%"}}>
            <div className="card-body">
              <h1 className="card-title text-center">Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group text-center"></div>
                <Button
                  type="submit"
                  variant="outline-primary"
                  text-center
                  style={{ marginTop: "10px", marginLeft: "130px" }}
                >
                  Login
                </Button>
              </form>
              <div className="text-center mt-3">
                <a href="/signup">Don't have an account? Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

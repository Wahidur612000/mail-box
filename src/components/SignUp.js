import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABaG4S_aphDMO1LCWGC_o8rfNrqtaDdgw', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      navigate('/welcome');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div style={{
      backgroundImage: "url('https://t4.ftcdn.net/jpg/05/71/83/47/360_F_571834789_ujYbUnH190iUokdDhZq7GXeTBRgqYVwa.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    }}>
    <div >
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card" style={{marginTop:"100px",width:"80%"}}>
            <div className="card-body">
              <h1 className="card-title text-center">Sign Up</h1>
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
                  <label>password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button variant="outline-primary" style={{marginTop:"10px",marginLeft:"130px"}}>SignUp</Button>
              </form>
              <div className="text-center mt-3">
                <a href="/login">Have an account? Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignUp;

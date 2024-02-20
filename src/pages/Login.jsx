import { useState } from 'react';
import { login } from '../services/userService';
import { useNavigate } from 'react-router-dom';

import '../styles/pages/Login.scss';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errMessage, setErrMessage] = useState('');

  const handleLogin = async () => {
    try {
      if (username && password) {
        const resp = await login(username, password);

        if (resp?.data?.key === 'login_success') {
          // TO DO: export to constants
          const jwt = resp.data.result.token;
          localStorage.setItem('authToken', jwt);
          navigate('home');
        }
      }
    } catch (err) {
      setErrMessage(err?.response?.data?.message ?? 'Something went wrong');
    }
  };

  return (
    <div className="login-page">
      <div className="fly-in-text">Welcome to Sculptoni!</div>
      <div className="login-art"></div>
      <div className="login-container">
        <h2>Login</h2>
        <div className="login-info">
          <input
            type="text"
            placeholder="Username"
            className={`line-input ${errMessage ? 'invalid' : ''}`}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={`line-input ${errMessage ? 'invalid' : ''}`}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errMessage && <p className="err-message">{errMessage}</p>}
          <p className="forgot-password">Forgot password?</p>
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
          <p className="signin-options-text">Or sign up using:</p>
          <div className="signin-options">
            <div className="signin-option">
              <img src="https://img.icons8.com/color/2x/google-logo.png" />
            </div>
            <div className="signin-option">
              <img src="https://img.icons8.com/color/2x/github.png" />
            </div>
            <div className="signin-option">
              <img src="https://img.icons8.com/color/2x/linkedin.png" />
            </div>
          </div>
          <p className="register">Create account</p>
        </div>
      </div>
    </div>
  );
}

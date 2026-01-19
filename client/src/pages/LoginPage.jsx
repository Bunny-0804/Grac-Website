import React from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const navigate = useNavigate();

    return (
    <div className="login-page-container">
      {/* The Glass Login Box */}
      <div className="glass-login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please enter your details.</p>

        <form>
          {/* Roll No Input */}
          <div className="input-wrapper">
            <input 
              type="text" 
              placeholder="Roll No." 
              className="liquid-glass-input"
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-wrapper">
            <input 
              type="password" 
              placeholder="Password" 
              className="liquid-glass-input"
              required
            />
          </div>

          {/* The Blue Login Button */}
          <button type="submit" className="blue-pill-btn" onClick={() => navigate('/StudentHome')}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
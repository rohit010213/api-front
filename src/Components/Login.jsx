import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct named import
import './styles/Auth.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('https://mern-api-5.onrender.com/api/users/login', {
        username,
        password
      });
      
      const { token } = response.data;
      localStorage.setItem('token', token);
      
      // Decode the token and check the role
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === 'admin') {
        navigate('/car-list');
      } else {
        navigate('/car-list-user');
      }
    } catch (error) {
      // Set error state if login fails
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Login error:', error);
    }
  };
  
  return (
    <div className="auth-container">
      <h1>Assignment for
      Quadiro Technologies</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="auth-error">{error}</p>}
      </form>
      <button className="toggle-button" onClick={() => navigate('/register')}>Register</button>
    </div>
  );
};

export default Login;

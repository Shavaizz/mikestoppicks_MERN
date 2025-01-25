import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Login.css'
  const Login = ({ onLogin }) => {
    const [email, setEmail] = useState(''); // Renamed to email
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      
      e.preventDefault();
      setLoading(true);
      setError(''); // Clear previous errors
      try {
        const response = await axios.post('http://localhost:3000/api/user/login', {
          email,
          password,
        });
        const { user, token } = response.data;
        if (user && token) {
          onLogin({ user, token });
          if (user.isAdmin) {
            navigate('/admin');
          } else {
            navigate('/');
          }        } else {
          console.log("user:", user);
          console.log("token:", token);
          throw new Error('Invalid server response');
        }
      } catch (err) {
        setError(err.response?.data?.message);
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    return (
      <> 
      <div className='login-wrapper'>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form id="form-wrapper" onSubmit={handleLogin} disabled={loading}>
            <div>
              <label>Email:</label> {/* Updated label */}
              <input
                type="email"
                value={email} // Updated to email
                onChange={(e) => setEmail(e.target.value)} // Updated to setEmail
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" id='login-button'>
              {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
      </div>
      </>
    );
  };

  export default Login;

  
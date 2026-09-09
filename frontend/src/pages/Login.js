

import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from '../api';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', { email, password });
      dispatch(login({ role: response.data.role, userId: response.data.userId }));
      navigate('/home');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ 
      backgroundImage: `url("/images/tp.jpg")`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <Container maxWidth="xs" style={{ backgroundColor: 'rgba(255, 255, 255, 0.99)', padding: '20px', borderRadius: '8px' }}>
        <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 700 }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
            Login
          </Button>
        </form>
        {error && <Typography style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</Typography>}
        <Typography variant="body2" style={{ marginTop: '20px', textAlign: 'center' }}>
          Not a user?{' '}
          <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
            Sign up
          </Link>
        </Typography>
      </Container>
    </div>
  );
}

export default Login;

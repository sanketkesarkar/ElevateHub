


import React, { useState } from 'react';
import { TextField, Button, Container, MenuItem, Typography } from '@mui/material';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('user'); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/register', {
        fullName,
        email,
        password,
        type,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error signing up');
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
          Signup
        </Typography>
        {message && (
          <Typography style={{ color: message.includes('success') ? 'green' : 'red', marginBottom: '10px', textAlign: 'center' }}>
            {message}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
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
          <TextField
            select
            label="Role"
            fullWidth
            value={type}
            onChange={(e) => setType(e.target.value)}
            margin="normal"
            required
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="instructor">Instructor</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
            Signup
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Signup;

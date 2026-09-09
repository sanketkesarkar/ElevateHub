




import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, TextField, Button, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from '../api';

function Profile() {
  const { userId } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/user/profile/${userId}`);
        setProfile(response.data);
        setFullName(response.data.fullName);
        setEmail(response.data.email);
        setProfilePhoto(response.data.profilePhoto);
      } catch (err) {
        console.error('Error fetching profile:', err.message);
        setError('Unable to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handlePhotoChange = (event) => {
    if (event.target.files.length > 0) {
      setProfilePhoto(event.target.files[0]); 
    }
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    if (profilePhoto instanceof File) {
      formData.append('profilePhoto', profilePhoto);
    }

    try {
      const response = await axios.put(`/user/profile/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile(response.data.user);
      setProfilePhoto(response.data.user.profilePhoto); // Set updated photo URL
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('Error updating profile');
    }
  };

  if (loading) {
    return <Typography style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>
        {error}
      </Typography>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: 'url("/images/profile-banner.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '40px 20px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Avatar
          alt={profile.fullName}
          src={
            profilePhoto instanceof File
              ? URL.createObjectURL(profilePhoto) 
              : profilePhoto
              ? `http://localhost:4000${profilePhoto}`
              : '/images/default-avatar.png' 
          }
          style={{
            width: '150px', 
            height: '150px', 
            margin: '0 auto 10px auto',
            border: '4px solid white',
          }}
        />
        <Typography variant="h4" style={{ fontWeight: 700 }}>
          {profile.fullName}
        </Typography>
        <Typography variant="subtitle1">{profile.email}</Typography>
      </div>

      {/* Profile Details */}
      <Container style={{ marginTop: '30px', maxWidth: '600px' }}>
        <Card
          style={{
            padding: '20px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
          }}
        >
          <CardContent>
            {editing ? (
              <>
                <Typography variant="h5" style={{ marginBottom: '20px', fontWeight: 600 }}>
                  Edit Profile
                </Typography>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ marginBottom: '20px' }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: '20px' }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ marginBottom: '20px' }}
                />
                <div style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateProfile}
                    style={{ marginRight: '10px' }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Typography variant="h5" style={{ marginBottom: '20px', fontWeight: 600 }}>
                  Profile Details
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '10px' }}>
                  <strong>Name:</strong> {profile.fullName}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '10px' }}>
                  <strong>Email:</strong> {profile.email}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '10px' }}>
                  <strong>Role:</strong> {profile.type === 'instructor' ? 'Instructor' : 'User'}
                </Typography>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditing(true)}
                    style={{ marginTop: '20px' }}
                  >
                    Edit Profile
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Profile;




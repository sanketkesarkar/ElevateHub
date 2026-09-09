import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from '../api';

function AddCourse() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');

  const handleAddVideo = () => {
    setVideos([...videos, { title: videoTitle, url: videoUrl }]);
    setVideoTitle('');
    setVideoUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const instructorId = localStorage.getItem('userId');
      const response = await axios.post('/course/add', {
        title,
        description,
        price: Number(price),
        videos,
        instructorId,
      });
      setMessage(response.data.message);
      setTitle('');
      setDescription('');
      setPrice('');
      setVideos([]);
    } catch (error) {
      setMessage('Error adding course');
    }
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <h2>Add a New Course</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Course Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
        />
        <h3>Add Videos</h3>
        <TextField
          label="Video Title"
          fullWidth
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Video URL"
          fullWidth
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          margin="normal"
        />
        <Button variant="outlined" color="primary" onClick={handleAddVideo}>
          Add Video
        </Button>
        <ul>
          {videos.map((video, index) => (
            <li key={index}>
              {video.title} - {video.url}
            </li>
          ))}
        </ul>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Save Course
        </Button>
      </form>
    </Container>
  );
}

export default AddCourse;

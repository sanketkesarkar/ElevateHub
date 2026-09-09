

import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Typography, Card, CardContent, Divider, Button, TextField, Grid, Avatar } from '@mui/material';
import axios from '../api';

function WatchCourse() {
  const { id } = useParams(); 
  const { userId } = useSelector((state) => state.auth); 
  const [course, setCourse] = useState(null);
  const [discussions, setDiscussions] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/course/get/${id}`, {
          params: { userId },
        });
        setCourse(response.data);

        const discussionResponse = await axios.get(`/discussion/${id}`);
        setDiscussions(discussionResponse.data);
      } catch (err) {
        console.error('Error fetching course or discussions:', err.response?.data?.message || 'Unknown error');
        setError(err.response?.data?.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, userId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post('/discussion/add', {
        courseId: id,
        userId,
        content: newComment,
      });

      setDiscussions([...discussions, response.data.discussion]);
      setNewComment(''); 
    } catch (error) {
      console.error('Error adding comment:', error.message);
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

  if (!course) {
    return <Navigate to="/" />;
  }

  return (
    <Container style={{ marginTop: '30px', maxWidth: '1200px' }}>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: 'url("/images/course-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
          padding: '40px',
          textAlign: 'center',
          color: 'white',
          marginBottom: '30px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography variant="h3" style={{ fontWeight: 700 }}>
          {course.title}
        </Typography>
        <Typography variant="h6" style={{ marginTop: '10px' }}>
          {course.description}
        </Typography>
        <Typography variant="subtitle1" style={{ marginTop: '20px', fontWeight: 600 }}>
          Price: ${course.price}
        </Typography>
      </div>

      {/* Videos Section */}
      <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 700 }}>
        Course Videos
      </Typography>
      <Grid container spacing={3}>
        {course.videos.length === 0 ? (
          <Typography style={{ color: '#999', margin: 'auto' }}>No videos available for this course.</Typography>
        ) : (
          course.videos.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                style={{
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#f9f9f9',
                  height: '100%',
                }}
              >
                <CardContent style={{ textAlign: 'center' }}>
                  <Typography variant="h6" style={{ color: '#333', marginBottom: '10px' }}>
                    {video.title}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textTransform: 'none' }}
                  >
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Discussion Section */}
      <Divider style={{ margin: '40px 0' }} />
      <Typography variant="h4" style={{ marginBottom: '20px', fontWeight: 700 }}>
        Discussions
      </Typography>
      <Card
        style={{
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
          {discussions.length === 0 ? (
            <Typography style={{ color: '#999', textAlign: 'center' }}>No discussions yet. Be the first to comment!</Typography>
          ) : (
            discussions.map((discussion, index) => (
              <Card
                key={index}
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <CardContent style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Avatar alt={discussion.userId.fullName} src={discussion.userId.profilePhoto || '/images/default-avatar.png'} />
                  <div>
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                      {discussion.userId.fullName}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#555' }}>
                      {discussion.content}
                    </Typography>
                    <Typography variant="caption" style={{ color: '#999' }}>
                      {new Date(discussion.createdAt).toLocaleString()}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <TextField
          fullWidth
          label="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          multiline
          rows={2}
          variant="outlined"
          style={{ marginBottom: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddComment}>
          Post Comment
        </Button>
      </Card>
    </Container>
  );
}

export default WatchCourse;




import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid, 
  Box 
} from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import axios from '../api';

function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role, userId } = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/course/get', {
          params: { userId, role },
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [role, userId]);

  const handleAddToDashboard = async (courseId) => {
    try {
      const courseToAdd = courses.find((c) => c._id === courseId);
      const response = await axios.post('/course/add', {
        title: courseToAdd.title,
        description: courseToAdd.description,
        price: courseToAdd.price,
        videos: courseToAdd.videos,
        instructorId: courseToAdd.instructorId,
        userId,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error adding course to dashboard');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (courses.length === 0) {
    return <Typography>No courses available</Typography>;
  }

  return (
    <Container sx={{ marginTop: '40px' }}>
      <Typography variant="h4" gutterBottom>Available Courses</Typography>
      {message && <Typography style={{ color: 'green', marginBottom: '20px' }}>{message}</Typography>}
      <Grid container spacing={4}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '16px' }}>
                  {course.description.length > 100 ? `${course.description.substring(0, 100)}...` : course.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>
                    ${course.price}
                  </Typography>
                </Box>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
                {role === 'instructor' ? (
                  <Button
                    variant="contained"
                    startIcon={<PlayCircleFilledIcon />}
                    onClick={() => window.location.href = `/watch/${course._id}`}
                    sx={{
                      backgroundColor: 'purple',
                      color: 'white',
                      '&:hover': { backgroundColor: 'white', color: 'purple' },
                    }}
                  >
                    Watch Course
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => handleAddToDashboard(course._id)}
                    sx={{
                      backgroundColor: 'purple',
                      color: 'white',
                      '&:hover': { backgroundColor: 'white', color: 'purple' },
                    }}
                  >
                    Add to Dashboard
                  </Button>
                )}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ViewCourses;
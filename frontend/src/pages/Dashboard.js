
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Grid, 
  CircularProgress, 
  Box 
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [dashboardCourses, setDashboardCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardCourses = async () => {
      try {
        const response = await axios.get('/course/dashboard', {
          params: { userId },
        });
        setDashboardCourses(response.data);
      } catch (error) {
        console.error('Error fetching dashboard courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardCourses();
  }, [userId]);

  const handleRemoveCourse = async (courseId) => {
    try {
      await axios.delete(`/course/remove/${courseId}`, {
        params: { userId },
      });
      setDashboardCourses((prev) => prev.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error('Error removing course:', error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return (
      <Container sx={{ marginTop: '40px', textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: '10px' }}>Loading your courses...</Typography>
      </Container>
    );
  }

  if (dashboardCourses.length === 0) {
    return (
      <Container sx={{ marginTop: '40px', textAlign: 'center' }}>
        <Typography variant="h5" color="textSecondary">No courses in your dashboard yet. Start learning today!</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: '40px' }}>
      <Typography variant="h4" gutterBottom>Your Dashboard</Typography>
      <Grid container spacing={4}>
        {dashboardCourses.map((course) => (
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
                  {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StarIcon color="warning" fontSize="small" />
                    <Typography variant="body2" sx={{ marginLeft: '4px' }}>4.5 (120)</Typography>
                  </Box> */}
                </Box>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
                <Button
                  variant="contained"
                  startIcon={<PlayCircleFilledIcon />}
                  onClick={() => navigate(`/watch/${course._id}`)}
                  sx={{
                    backgroundColor: 'purple',
                    color: 'white',
                    '&:hover': { backgroundColor: 'darkpurple' },
                  }}
                >
                  Watch Course
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleRemoveCourse(course._id)}
                >
                  Remove
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;
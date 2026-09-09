import React from 'react';
import {
  Container, Typography, Button, Box, AppBar, Toolbar, Grid, Card, CardContent, CardMedia,
  Avatar, CircularProgress, Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DevicesIcon from '@mui/icons-material/Devices';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === 'dark';
  const bgColor = isDarkMode ? '#000' : '#f9f9f9';
  const sectionBg = isDarkMode ? '#111' : '#fff';
  const textColor = isDarkMode ? '#eee' : '#333';
  const subTextColor = isDarkMode ? '#ccc' : '#555';
  const cardBg = isDarkMode ? '#1e1e1e' : '#fff';
  const sectionAltBg = isDarkMode ? '#222' : '#f9f9f9';

  const courses = [
    { title: 'Master React Basics', videoUrl: 'https://www.youtube.com/embed/DLX62G4lc44' },
    { title: 'Introduction to Python', videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw' },
    { title: 'Data Science Essentials', videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30' },
  ];

  const subscriptionPlans = [
    { feature: 'Access to Courses', basic: '✓', pro: '✓', enterprise: '✓' },
    { feature: 'HD Video Quality', basic: '✓', pro: '✓', enterprise: '✓' },
    { feature: 'Downloadable Resources', basic: '', pro: '✓', enterprise: '✓' },
    { feature: 'Certificate of Completion', basic: '', pro: '✓', enterprise: '✓' },
    { feature: 'Priority Support', basic: '', pro: '', enterprise: '✓' },
    { feature: 'Custom Learning Paths', basic: '', pro: '', enterprise: '✓' },
    { feature: 'Price', basic: '$9.99/mo', pro: '$19.99/mo', enterprise: 'Contact Us' },
  ];

  const testimonials = [
    { name: 'Emma Carter', feedback: 'ElevateHub empowered me to change careers with confidence.', role: 'UX Designer', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Noah Davis', feedback: 'Courses are accessible and instructors are great.', role: 'Web Developer', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Olivia Johnson', feedback: 'Highly recommend it to anyone looking to enhance skills.', role: 'Data Analyst', avatar: 'https://i.pravatar.cc/150?img=3' },
  ];

  const galleryItems = [
    { title: 'Web Design Portfolio', image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0', description: 'Responsive websites built with HTML, CSS, and JavaScript.' },
    { title: 'Mobile App Development', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c', description: 'React Native apps for iOS and Android.' },
    { title: 'Data Visualization Project', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', description: 'Dashboards built using D3.js for data insights.' },
    { title: 'Machine Learning Model', image: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f', description: 'TensorFlow-based image classification model.' },
    { title: 'UX/UI Design Case Study', image: '/images/uiuxi.png', description: 'Redesign case study for a major e-commerce site.' },
    { title: 'Blockchain Application', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475', description: 'Ethereum-based DApp for secure transactions.' },
  ];

  return (
    <Box sx={{ backgroundColor: bgColor, minHeight: '100vh', color: textColor }}>
      {/* Header Section */}
      <AppBar position="static" sx={{ background: '#6a11cb', padding: '10px 0' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
            Welcome to ElevateHub – Your Ultimate Skill-Sharing Platform!
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0') no-repeat center center`,
          backgroundSize: 'cover',
          minHeight: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          color: 'white',
          textAlign: 'center',
          padding: '50px',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
          Learn Anytime, Anywhere
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9, mb: 4, maxWidth: '800px' }}>
          Join thousands of learners upgrading their skills and advancing their careers.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: 'white',
            color: '#6a11cb',
            padding: '15px 40px',
            fontSize: '18px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#6a11cb',
              color: 'white',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease-in-out',
          }}
          onClick={() => navigate('/courses')}
        >
          Explore Courses
        </Button>
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ padding: '80px 20px', background: sectionBg }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: textColor }}>Why Choose Us?</Typography>
          <Grid container spacing={4}>
            {[{ icon: <SchoolIcon />, label: 'Expert Instructors' }, { icon: <AccessTimeIcon />, label: 'Flexible Learning' }, { icon: <DevicesIcon />, label: 'Multi-device Access' }, { icon: <EmojiEventsIcon />, label: 'Certification Programs' }].map((item, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Box display="flex" alignItems="center">
                  <Box sx={{ color: '#6a11cb', mr: 2 }}>{item.icon}</Box>
                  <Typography variant="h6" sx={{ color: textColor }}>{item.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Courses */}
      <Box sx={{ padding: '80px 20px', background: sectionAltBg }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: textColor }}>Featured Courses</Typography>
          <Grid container spacing={4}>
            {courses.map((course, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{ backgroundColor: cardBg }}>
                  <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                    <CardMedia component='iframe' src={course.videoUrl} title={course.title} allowFullScreen sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
                    <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%', mt: '-20px', ml: '-20px' }} />
                  </Box>
                  <CardContent>
                    <Typography variant='h6' sx={{ fontWeight: 'bold', color: textColor }}>{course.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Subscription Plans */}
      <Box sx={{ padding: '80px 20px', background: sectionBg }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: textColor }}>Subscription Plans</Typography>
          <TableContainer component={Paper} sx={{ background: cardBg }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Features</TableCell>
                  <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Basic</TableCell>
                  <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Pro</TableCell>
                  <TableCell align="center" sx={{ color: '#fff', fontWeight: 'bold' }}>Enterprise</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriptionPlans.map((plan, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ color: subTextColor }}>{plan.feature}</TableCell>
                    <TableCell align="center" sx={{ color: subTextColor }}>{plan.basic}</TableCell>
                    <TableCell align="center" sx={{ color: subTextColor }}>{plan.pro}</TableCell>
                    <TableCell align="center" sx={{ color: subTextColor }}>{plan.enterprise}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ padding: '80px 20px', background: sectionAltBg }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: textColor }}>What Our Learners Say</Typography>
          <Grid container spacing={4}>
            {testimonials.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{ padding: '20px', backgroundColor: cardBg }}>
                  <CardContent>
                    <Typography variant='body1' sx={{ color: subTextColor, fontStyle: 'italic' }}>
                      "{item.feedback}"
                    </Typography>
                    <Stack direction='row' spacing={2} alignItems='center' mt={2}>
                      <Avatar src={item.avatar} alt={item.name} />
                      <Box>
                        <Typography variant='h6' sx={{ color: textColor }}>{item.name}</Typography>
                        <Typography variant='body2' sx={{ color: '#6a11cb' }}>{item.role}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Skill Showcase Gallery */}
      <Box sx={{ padding: '80px 20px', background: sectionBg }}>
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: textColor }}>
            Skill Showcase Gallery
          </Typography>
          <Grid container spacing={4}>
            {galleryItems.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: cardBg }}>
                  <CardMedia component="img" height="200" image={item.image} alt={item.title} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" sx={{ color: textColor }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: subTextColor }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box sx={{ background:'#333', color:'white', padding:'40px 0', textAlign:'center' }}>
        <Container maxWidth='lg'>
          <Typography variant='h6' sx={{ marginBottom:'20px' }}>Connect with us</Typography>
          <Stack direction='row' spacing={2} justifyContent='center' sx={{ marginBottom:'30px' }}>
            <a href='https://twitter.com/' target='_blank' rel='noopener noreferrer'>
              <TwitterIcon sx={{ fontSize:30, color: 'white' }} />
            </a>
            <a href='https://www.linkedin.com/' target='_blank' rel='noopener noreferrer'>
              <LinkedInIcon sx={{ fontSize:30, color: 'white' }} />
            </a>
            <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
              <FacebookIcon sx={{ fontSize:30, color: 'white' }} />
            </a>
          </Stack>
          <Typography variant='body1' sx={{ opacity: .7, marginBottom: '10px' }}>
            ©2025 ElevateHub. All rights reserved.
          </Typography>
          <Typography variant='body2'>Crafted for learners and instructors alike.</Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;

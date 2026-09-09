


import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { useTheme } from '@mui/material/styles';
import axios from '../api';

function Navbar() {
  const { isAuthenticated, role, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({ fullName: '', profilePhoto: null });
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens
  const [anchorEl, setAnchorEl] = useState(null); // Manage profile menu state

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get(`/user/profile/${userId}`);
          setProfile({
            fullName: response.data.fullName,
            profilePhoto: response.data.profilePhoto,
          });
        } catch (error) {
          console.error('Error fetching profile:', error.message);
        }
      }
    };

    fetchProfile();
  }, [isAuthenticated, userId]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  const getInitials = (name) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      style={{
        background: 'linear-gradient(90deg, #4b266e 0%, #6b2b92 100%)',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        marginBottom: '20px',
      }}
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo and Brand */}
        <Typography
          variant="h6"
          style={{
            fontWeight: 700,
            color: 'white',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link
            to="home"
            style={{
              textDecoration: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ height: '40px', marginRight: '10px' }}
            />
            ElevateHub
          </Link>
        </Typography>

        {/* Desktop View */}
        {!isMobile ? (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                <Button
                  component={Link}
                  to="/home"
                  startIcon={<HomeIcon />}
                  style={{
                    color: 'white',
                    textTransform: 'capitalize',
                    fontWeight: 500,
                    fontSize: '16px',
                  }}
                >
                  Home
                </Button>
                <Button
                  component={Link}
                  to="/about-us"
                  startIcon={<InfoIcon />}
                  style={{
                    color: 'white',
                    textTransform: 'capitalize',
                    fontWeight: 500,
                    fontSize: '16px',
                  }}
                >
                  About Us
                </Button>
                <Button
                  component={Link}
                  to="/courses"
                  startIcon={<SchoolIcon />}
                  style={{
                    color: 'white',
                    textTransform: 'capitalize',
                    fontWeight: 500,
                    fontSize: '16px',
                  }}
                >
                  Courses
                </Button>
                {role === 'instructor' && (
                  <Button
                    component={Link}
                    to="/add-course"
                    startIcon={<AddIcon />}
                    style={{
                      color: 'white',
                      textTransform: 'capitalize',
                      fontWeight: 500,
                      fontSize: '16px',
                    }}
                  >
                    Add Course
                  </Button>
                )}
                {role !== 'instructor' && (
                  <Button
                    component={Link}
                    to="/dashboard"
                    startIcon={<DashboardIcon />}
                    style={{
                      color: 'white',
                      textTransform: 'capitalize',
                      fontWeight: 500,
                      fontSize: '16px',
                    }}
                  >
                    Dashboard
                  </Button>
                )}
                <IconButton onClick={handleMenuOpen} style={{ padding: 0 }}>
                  <Avatar
                    alt={profile.fullName}
                    src={profile.profilePhoto}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '2px solid white',
                      backgroundColor: '#4b266e',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  >
                    {!profile.profilePhoto && getInitials(profile.fullName)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleMenuClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon style={{ marginRight: '10px' }} />
                    Logout
                  </MenuItem>
                  
                </Menu>
                <IconButton onClick={toggleTheme} style={{ color: 'white' }}>
                  {mode === 'dark' ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  style={{
                    color: 'white',
                    textTransform: 'capitalize',
                    fontWeight: 500,
                    fontSize: '16px',
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  style={{
                    color: '#ffd700',
                    textTransform: 'capitalize',
                    fontWeight: 600,
                    fontSize: '16px',
                  }}
                >
                  Signup
                </Button>
              </>
            )}
          </div>
        ) : (
         
          <>
            <IconButton
              onClick={handleMenuOpen}
              style={{ color: 'white' }}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {isAuthenticated ? (
                <>
                  <MenuItem
                    component={Link}
                    to="/home"
                    onClick={handleMenuClose}
                    startIcon={<HomeIcon />}
                  >
                    Home
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/about-us"
                    onClick={handleMenuClose}
                  >
                    About Us
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/courses"
                    onClick={handleMenuClose}
                  >
                    Courses
                  </MenuItem>
                  <IconButton onClick={toggleTheme} style={{ color: 'white' }}>
                  {mode === 'dark' ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
                </IconButton>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon style={{ marginRight: '10px' }} />
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    component={Link}
                    to="/login"
                    onClick={handleMenuClose}
                  >
                    Login
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/signup"
                    onClick={handleMenuClose}
                  >
                    Signup
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

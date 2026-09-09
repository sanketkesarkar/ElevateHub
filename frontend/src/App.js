import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './pages/Login';
import Home from './pages/Home';
import AddCourse from './pages/AddCourse';
import ViewCourses from './pages/ViewCourses';
import WatchCourse from './pages/WatchCourse';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Aboutus from './pages/Aboutus';

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}

function App() {
    const { isAuthenticated, role } = useSelector((state) => state.auth);
  
    return (
      <ThemeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute allowedRoles={['instructor', 'user']}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about-us"
              element={
                <ProtectedRoute allowedRoles={['instructor', 'user']}>
                  <Aboutus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-course"
              element={
                <ProtectedRoute allowedRoles={['instructor']}>
                  <AddCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute allowedRoles={['instructor', 'user']}>
                  <ViewCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['instructor', 'user']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={['instructor', 'user']}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/watch/:id"
              element={
                <ProtectedRoute allowedRoles={['instructor', 'user']}>
                  <WatchCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  role === 'instructor' ? (
                    <Navigate to="/home" />
                  ) : (
                    <Navigate to="/courses" />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }
  
  export default App;
  
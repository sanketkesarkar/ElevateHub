const express = require('express');
const Course = require('../models/Course');

const router = express.Router();


router.post('/add', async (req, res) => {
  const { title, description, price, videos, instructorId, userId } = req.body; // Include userId
  try {
    const course = new Course({ title, description, price, videos, instructorId, userId });
    await course.save();
    res.status(201).json({ message: 'Course added successfully' });
  } catch (error) {
    console.error('Error adding course:', error.message);
    res.status(500).json({ message: 'Error adding course', error: error.message });
  }
});

router.get('/dashboard', async (req, res) => {
  const { userId } = req.query; 
  try {
    const courses = await Course.find({ userId }); 
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching dashboard courses:', error.message);
    res.status(500).json({ message: 'Error fetching dashboard courses', error: error.message });
  }
});

router.delete('/remove/:id', async (req, res) => {
  const { userId } = req.query; 
  const courseId = req.params.id; 

  try {
    const course = await Course.findOneAndDelete({ _id: courseId, userId }); 
    if (!course) {
      return res.status(404).json({ message: 'Course not found or not associated with your dashboard' });
    }
    res.status(200).json({ message: 'Course removed from dashboard' });
  } catch (error) {
    console.error('Error removing course:', error.message);
    res.status(500).json({ message: 'Error removing course', error: error.message });
  }
});


router.get('/get/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

   
    if (req.query.role === 'instructor' && course.instructorId.toString() !== req.query.userId) {
      return res.status(403).json({ message: 'You can only view courses you created.' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.get('/get', async (req, res) => {
  const { userId, role } = req.query;

  try {
    console.log('Query Parameters:', { userId, role }); 
    let courses;

    if (role === 'instructor') {
      courses = await Course.find({ instructorId: userId });
      console.log('Filtered Courses for Instructor:', courses); 
    } else {
      courses = await Course.find();
      console.log('All Courses for User:', courses); 
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});









module.exports = router;

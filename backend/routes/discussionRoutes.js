const express = require('express');
const Discussion = require('../models/Discussion');
const router = express.Router();

router.post('/add', async (req, res) => {
  const { courseId, userId, content } = req.body;

  try {
    const discussion = new Discussion({ courseId, userId, content });
    await discussion.save();
    res.status(201).json({ message: 'Comment added successfully', discussion });
  } catch (error) {
    console.error('Error adding comment:', error.message);
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
});

router.get('/:courseId', async (req, res) => {
  try {
    const discussions = await Discussion.find({ courseId: req.params.courseId }).populate('userId', 'fullName');
    res.status(200).json(discussions);
  } catch (error) {
    console.error('Error fetching discussions:', error.message);
    res.status(500).json({ message: 'Error fetching discussions', error: error.message });
  }
});

module.exports = router;

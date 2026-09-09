const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const discussionRoutes = require('./routes/discussionRoutes');

const path = require('path');



dotenv.config();




const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');


const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/user', userRoutes);
app.use('/course', courseRoutes);
app.use('/discussion', discussionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

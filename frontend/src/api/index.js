import axios from 'axios';

const api = axios.create({
  baseURL:  'https://webdesign-final-grp8.onrender.com'
, 
});

export default api;

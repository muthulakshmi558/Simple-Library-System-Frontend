import axios from 'axios';

const api = axios.create({
  baseURL: 'https://simple-library-system-backend.onrender.com/api/',
});

export default api;

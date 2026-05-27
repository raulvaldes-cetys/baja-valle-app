import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
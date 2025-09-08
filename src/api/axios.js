// src/api/axios.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Render backend URL

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000, // 15 sec timeout
});

// Optional helper function
export const downloadVideo = async (videoUrl) => {
  try {
    const res = await api.post('/youtubepost', { url: videoUrl });
    return res.data;
  } catch (err) {
    if (err.response) {
      console.error('Server error:', err.response.data);
    } else if (err.request) {
      console.error('No response from server:', err.request);
    } else {
      console.error('Axios error:', err.message);
    }
    throw err;
  }
};

export default api; // ✅ export Axios instance for direct use

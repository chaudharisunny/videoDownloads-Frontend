import axios from 'axios';

// 1. Use full Render backend URL (you already did)
 const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json', // ensures JSON is sent
  },
  timeout: 10000, // optional: 10 sec timeout
});

// 2. Video download function
const downloadVideo = async (videoUrl) => {
  try {
    const res = await api.post('/youtubepost', { url: videoUrl });
    console.log(res.data);
    return res.data; // return data so components can use it
  } catch (err) {
    // 3. Improved error logging
    if (err.response) {
      console.error('Server responded with error:', err.response.data);
    } else if (err.request) {
      console.error('No response received from server:', err.request);
    } else {
      console.error('Axios error:', err.message);
    }
    throw err; // re-throw if needed
  }
};

export default downloadVideo;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://viideodownloadapis.onrender.com/api/v1',
});

const downloadVideo = async (videoUrl) => {
  try {
    const res = await api.post('/youtubepost', { url: videoUrl });
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};
export default downloadVideo
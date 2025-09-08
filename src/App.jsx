
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Component/navbar";
import VideoDownloader from "./Component/VideoDownloader";
import InstagramDownload from "./Component/InstagramDownload";
import FacebookDownload from "./Component/FacebookDownload";
import TwitterDownload from "./Component/TwitterDownload";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16 px-4">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <div className="text-center mt-20">
                <h1 className="text-3xl font-bold">Welcome to Snaplytics 🚀</h1>
                <p className="text-gray-600 mt-2">
                  Download videos from YouTube, Instagram, Facebook, and Twitter.
                </p>
              </div>
            }
          />

          {/* Video Downloaders */}
          <Route path="/youtubepost" element={<VideoDownloader />} />
          <Route path="/instagramDownload" element={<InstagramDownload />} />
          <Route path="/facebookDownload" element={<FacebookDownload />} />
          <Route path="/twitterDownload" element={<TwitterDownload />} />

          {/* Catch-all 404 Page */}
          <Route
            path="*"
            element={
              <div className="text-center mt-20">
                <h2 className="text-2xl font-semibold">404 - Page Not Found</h2>
                <p className="text-gray-500 mt-2">Oops! This page doesn’t exist.</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

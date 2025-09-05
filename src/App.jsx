import React from "react";
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
      <div className="pt-16"> {/* push content below fixed navbar */}
        <Routes>
          <Route path="/" element={<h1 className="text-center mt-20">Welcome to Snaplytics 🚀</h1>} />
          <Route path="/youtube" element={<VideoDownloader />} />
          <Route path="/instagramDownload" element={<InstagramDownload />} />
          <Route path="/facebookDownload" element={<FacebookDownload />} />
           <Route path="/twitterDownload" element={<TwitterDownload />} />
          {/* Add more later: Twitter, Facebook, etc. */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import axios from "axios";

export default function FacebookDownload() {
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const downloadVideo = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "facebook-video.mp4";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Video download failed", err);
    }
  };

  const handleDownload = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setVideoUrl(null);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/facebookpost",
        { url }
      );

      if (!res.data || !res.data.videoUrl) {
        setError("No video found. The post may be private or unsupported.");
      } else {
        setVideoUrl(res.data.videoUrl);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch video. Please check the URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl">
      <div className="mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold">Facebook Video Downloader</h1>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Paste Facebook URL..."
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleDownload}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {loading ? "Loading..." : "Fetch Video"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {videoUrl && (
        <div className="mt-6 text-center">
          <video
            src={videoUrl}
            controls
            className="mx-auto rounded-lg shadow-md max-h-80 w-full"
          ></video>
          <button
            onClick={() => downloadVideo(videoUrl)}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm mt-2"
          >
            Download Video
          </button>
        </div>
      )}
    </div>
  );
}

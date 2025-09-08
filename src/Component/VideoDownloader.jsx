import React, { useState } from "react";
import api from "../api/axios";

export default function VideoDownloader() {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setVideoData(null);

    try {
      const res = await api.post("/youtubepost", { url });

      if (res.data.success) {
        setVideoData({
          ...res.data,
          video: `${import.meta.env.VITE_API_URL}/youtube/video?url=${encodeURIComponent(url)}`,
          audio: `${import.meta.env.VITE_API_URL}/youtube/audio?url=${encodeURIComponent(url)}`,
        });
      } else {
        setError("Failed to fetch video.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error fetching video. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl">
      <div className="mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-red-600">YouTube Downloader</h1>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL..."
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={handleDownload}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {videoData && (
        <div className="mt-6 text-center">
          {videoData.thumbnail && (
            <img
              src={videoData.thumbnail}
              alt="YouTube Thumbnail"
              className="mx-auto rounded-lg shadow-md mb-4 w-full h-80 object-contain bg-cover"
            />
          )}

          <h2 className="text-lg font-semibold mb-2">{videoData.title}</h2>
          <p className="text-sm text-gray-600 mb-1">By {videoData.author}</p>
          <p className="text-sm text-gray-600 mb-4">Duration: {videoData.duration}s</p>

          <div className="flex flex-col gap-3 mt-4">
            <a
              href={videoData.video}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              ⬇️ Download MP4
            </a>
            <a
              href={videoData.audio}
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
            >
              🎵 Download MP3
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

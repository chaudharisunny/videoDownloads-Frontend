import React, { useState } from "react";
import axios from "axios";

export default function InstagramDownload() {
  const [url, setUrl] = useState("");
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const downloadFile = async (fileUrl, filename) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename || "file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  const handleDownload = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError("");
    setMediaData(null);

    try {
      // ✅ Relative URL works on Vercel
      const res = await axios.post("/api/v1/downloadpost", { url });
      setMediaData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch media. Please check the URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl">
      <div className="mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold">Instagram Downloader</h1>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Paste Instagram URL..."
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleDownload}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {mediaData?.success && (
        <div className="mt-6 text-center space-y-6">
          {mediaData?.type === "image" && (
            <>
              <img
                src={`/api/v1/proxy?url=${encodeURIComponent(mediaData.imageUrl)}`}
                alt="Instagram Post"
                className="mx-auto rounded-lg shadow-md mb-4 w-full h-80 object-contain"
              />
              <button
                onClick={() =>
                  downloadFile(
                    `/api/v1/proxy?url=${encodeURIComponent(mediaData.imageUrl)}`,
                    "instagram-image.jpg"
                  )
                }
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
              >
                Download Image
              </button>
            </>
          )}

          {mediaData?.type === "video" && (
            <>
              <video
                controls
                className="mx-auto rounded-lg shadow-md mb-4 max-h-80"
              >
                <source
                  src={`/api/v1/proxy?url=${encodeURIComponent(mediaData.videoUrl)}`}
                  type="video/mp4"
                />
              </video>
              <button
                onClick={() =>
                  downloadFile(
                    `/api/v1/proxy?url=${encodeURIComponent(mediaData.videoUrl)}`,
                    "instagram-video.mp4"
                  )
                }
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                Download Video
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

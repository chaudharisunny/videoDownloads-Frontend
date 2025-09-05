import React, { useState } from "react";
import axios from "axios";

export default function TwitterDownload() {
  const [url, setUrl] = useState("");
  const [mediaData, setMediaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validate Twitter URL
  const isValidTwitterUrl = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.hostname.includes("x.com") && /status\/\d+/.test(parsed.pathname);
    } catch {
      return false;
    }
  };

  // Download helper
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
    if (!url.trim() || !isValidTwitterUrl(url)) {
      setError("Please enter a valid Twitter URL");
      return;
    }

    setLoading(true);
    setError("");
    setMediaData(null);

    try {
      const res = await axios.post("http://localhost:3000/api/v1/twitterpost", { url });
      console.log("Media Data:", res.data);

      // Normalize data: ensure media is always an array
      const mediaArray = Array.isArray(res.data.media) ? res.data.media : [res.data.media];
      setMediaData({ success: res.data.success, media: mediaArray });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch media. Please check the URL.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl">
      {/* Header */}
      <div className="mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold">Twitter Downloader</h1>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Paste Twitter URL..."
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
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Media Section */}
      {mediaData?.success && mediaData.media?.length > 0 && (
        <div className="mt-6 text-center space-y-6">
          {mediaData.media.map((item, index) => (
            <div key={index}>
              {/* Video */}
              {item.type === "video" && item.videoUrl && (
                <>
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt="Thumbnail"
                      className="mx-auto rounded-lg shadow-md max-h-80 mb-2"
                    />
                  )}
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Download Video
                  </a>
                </>
              )}

              {/* Image */}
              {item.type === "image" && item.thumbnail && (
                <>
                  <img
                    src={item.thumbnail}
                    alt="Twitter Post"
                    className="mx-auto rounded-lg shadow-md w-full h-80 object-contain mb-2"
                  />
                  <button
                    onClick={() => downloadFile(item.thumbnail, `twitter-image-${index + 1}.jpg`)}
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                  >
                    Download Image
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

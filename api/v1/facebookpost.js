export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;

  if (!url || url.trim() === "") {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Mocked response (replace with your real logic later)
    const isVideo = url.includes("video");

    if (isVideo) {
      return res.status(200).json({
        success: true,
        type: "video",
        videoUrl:
          "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
      });
    } else {
      return res.status(200).json({
        success: true,
        type: "image",
        imageUrl: "https://via.placeholder.com/600x400.png",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch media" });
  }
}

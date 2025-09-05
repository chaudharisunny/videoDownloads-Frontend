export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;
  if (!url || url.trim() === "") {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // TODO: Replace with your real Instagram fetching logic
    // Placeholder for demo:
    const mediaData = {
      success: true,
      type: "video", // "image" or "video"
      videoUrl: "https://example.com/fake-video.mp4",
      imageUrl: "https://example.com/fake-image.jpg",
    };

    return res.status(200).json(mediaData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch media" });
  }
}

import axios from "axios";

export const downloadInstagramPost = async (instagramUrl) => {
 if (!instagramUrl) return;

  try {
    const res = await axios.post(
      "http://localhost:3000/api/v1/downloadpost",
      { url: instagramUrl },
      { responseType: "blob" } // fetch binary
    );

    const contentType = res.headers["content-type"];
    const fileName = contentType.includes("video") ? "video.mp4" : "image.jpg";

    const blob = new Blob([res.data], { type: contentType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (err) {
    console.error("Download failed:", err);
    alert("Error downloading Instagram post.");
  }
};

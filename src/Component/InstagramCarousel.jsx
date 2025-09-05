import React, { useState } from "react";

export default function InstagramCarousel({ media }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!media || media.length === 0) {
    return <p className="text-center text-gray-500">No media to display</p>;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Media Display */}
      <div className="rounded-lg overflow-hidden shadow-md">
        {media[currentIndex].type === "image" ? (
          <img
            src={media[currentIndex].url}
            alt="Instagram Media"
            className="w-full object-cover"
          />
        ) : (
          <video
            src={media[currentIndex].url}
            controls
            className="w-full object-cover"
          />
        )}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full"
      >
        ◀
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-2 space-x-2">
        {media.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

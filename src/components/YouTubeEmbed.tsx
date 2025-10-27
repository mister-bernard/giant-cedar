import { useState, useEffect } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  thumbnail: string;
}

export const YouTubeEmbed = ({ videoId, thumbnail }: YouTubeEmbedProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;
      
      try {
        const data = JSON.parse(event.data);
        if (data.event === "onStateChange" && data.info === 0) {
          // Video ended (state 0)
          setIsPlaying(false);
        }
      } catch (e) {
        // Ignore parse errors
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (isPlaying) {
    return (
      <div className="relative w-full aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsPlaying(true)}
      className="relative w-full aspect-video group cursor-pointer overflow-hidden"
      aria-label="Play video"
    >
      <img
        src={thumbnail}
        alt="Video thumbnail"
        className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/6 aspect-square rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
          <Play className="w-1/3 h-1/3 text-white fill-white ml-1" />
        </div>
      </div>
    </button>
  );
};

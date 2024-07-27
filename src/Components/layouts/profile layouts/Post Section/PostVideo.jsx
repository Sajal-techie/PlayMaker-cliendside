// src/components/InstagramStyleVideo.js
import React, { useState, useEffect, useRef } from 'react';

const PostVideo = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    });
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleProgress = () => {
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progress);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={containerRef}>
      <video
        ref={videoRef}
        src={src}
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
        onTimeUpdate={handleProgress}
        className="w-full h-auto"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center p-2 opacity-0 transition-opacity duration-300 hover:opacity-100">
        <button
          onClick={togglePlay}
          className="text-white text-xl mr-2 focus:outline-none"
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button
          onClick={toggleMute}
          className="text-white text-xl mr-2 focus:outline-none"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
        <div className="flex-grow h-1 bg-gray-400 rounded-full">
          <div
            className="h-full bg-white rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PostVideo;
// src/components/VideoCard.js
import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <video controls className="w-full h-48 object-cover">
        <source src={video.video_files[0].link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="p-4">
        <p className="text-gray-700 font-semibold">{video.user.name}</p>
      </div>
    </div>
  );
};

export default VideoCard;

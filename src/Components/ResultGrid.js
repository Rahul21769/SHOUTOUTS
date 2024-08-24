// src/components/ResultsGrid.js
import React from 'react';
import ImageCard from './ImageCard';
import VideoCard from './VideoCard';

const ResultsGrid = ({ results, type }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {type === 'images' &&
        results.map((photo) => (
          <div key={photo.id}>
            <ImageCard photo={photo} />
          </div>
        ))}
      {type === 'videos' &&
        results.map((video) => (
          <div key={video.id}>
            <VideoCard video={video} />
          </div>
        ))}
    </div>
  );
};

export default ResultsGrid;

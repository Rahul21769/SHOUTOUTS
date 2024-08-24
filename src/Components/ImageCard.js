// src/components/ImageCard.js
import React from 'react';

const ImageCard = ({ photo }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={photo.src.medium} alt={photo.alt} className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-gray-700 font-semibold">{photo.photographer}</p>
      </div>
    </div>
  );
};

export default ImageCard;

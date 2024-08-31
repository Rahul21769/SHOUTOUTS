import React from "react";

const ResultGrid = ({ results }) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {results.map((item, index) => (
        <div key={index} className="break-inside-avoid mb-4">
          {"src" in item ? (
            <img
              src={item.src.large}
              alt={item.alt}
              className="w-full rounded-lg shadow-md"
            />
          ) : (
            <video
              src={item.video_files[0].link}
              className="w-full rounded-lg shadow-md"
              controls
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultGrid;

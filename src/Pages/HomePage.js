import React, { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import ResultsGrid from "../Components/ResultGrid";
import { searchPhotos, searchVideos } from "../Service/api";
import LogoShoutout from "../Images/LogoShoutout.jpg";  // Default import for images

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [type, setType] = useState("images");

  useEffect(() => {
    const fetchDefaultContent = async () => {
      if (type === "images") {
        const defaultImages = await searchPhotos("nature");
        setResults(defaultImages);
      } else if (type === "videos") {
        const defaultVideos = await searchVideos("nature");
        setResults(defaultVideos);
      }
    };

    fetchDefaultContent();
  }, [type]);

  const handleSearch = async (query) => {
    let data;
    if (type === "images") {
      data = await searchPhotos(query);
    } else {
      data = await searchVideos(query);
    }
    setResults(data);
  };

  const handleReset = async () => {
    setType("images");
    setResults([]);
    // Fetch default content for images
    const defaultImages = await searchPhotos("nature");
    setResults(defaultImages);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex mt-4 mb-4 bg-gray-800 py-4 px-4 rounded-lg items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <img 
            src={LogoShoutout}
            alt="Logo"  // Adding alt attribute for accessibility
            className="h-12 w-20" 
          />
          
          <div className="flex space-x-2">
            <button
              className={`${
                type === "images"
                  ? "bg-slate-500 text-white"
                  : "text-white"
              } h-10 w-24 px-4 py-2 rounded-lg focus:outline-none hover:bg-opacity-90 transition-all duration-200`}
              onClick={() => {
                setType("images");
                setResults([]);
              }}
            >
              Images
            </button>
            <button
              className={`${
                type === "videos"
                  ? "bg-slate-500 text-white"
                  : "text-white"
              } h-10 w-24 px-4 py-2 rounded-lg focus:outline-none hover:bg-opacity-90 transition-all duration-200`}
              onClick={() => {
                setType("videos");
                setResults([]);
              }}
            >
              Videos
            </button>
          </div>
        </div>

        <button
          type="button"
          className="text-white text-4xl flex items-center justify-center rounded focus:outline-none"
          style={{ height: '100%' }}
          onClick={handleReset}
        >
          &times;
        </button>
      </div>

      <SearchBar onSearch={handleSearch} />
      <ResultsGrid results={results} type={type} />
    </div>
  );
};

export default HomePage;

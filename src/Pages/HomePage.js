import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import SearchBar from "../Components/SearchBar";
import ResultGrid from "../Components/ResultGrid";
import { searchPhotos, searchVideos } from "../Service/api";
import LogoShoutout from "../Images/LogoShoutout.jpg";

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [type, setType] = useState("images"); // Default to images
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("nature"); // Default search query
  const [resetSearch, setResetSearch] = useState(false);
  const [noResultsMessage, setNoResultsMessage] = useState("");

  const { ref, inView } = useInView({ triggerOnce: false });

  useEffect(() => {
    const fetchContent = async () => {
      let data;
      if (type === "images") {
        data = await searchPhotos(query, page);
      } else {
        data = await searchVideos(query, page);
      }

      if (page === 1) {
        setResults(data);
        setNoResultsMessage(data.length === 0 ? `No results found for "${query}".` : "");
      } else {
        setResults((prevResults) => [...prevResults, ...data]);
      }
    };

    fetchContent();
  }, [type, page, query]);

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1); // Reset page to 1 on a new search
    setResetSearch(false); // Reset the reset state
  };

  const handleReset = () => {
    setQuery("nature"); // Reset to the default query
    setType("images"); // Reset to the default type
    setPage(1);
    setResults([]);
    setNoResultsMessage("");
    setResetSearch(true); // Trigger the reset in SearchBar
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex mt-4 mb-4 bg-gray-800 py-4 px-4 rounded-lg items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src={LogoShoutout}
            alt="Logo"
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
                setPage(1);
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
                setPage(1);
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

      <SearchBar onSearch={handleSearch} reset={resetSearch} />

      {noResultsMessage ? (
        <div className="text-center text-grey-500 mt-8">
          {noResultsMessage}
        </div>
      ) : (
        <ResultGrid results={results} type={type} />
      )}

      <div ref={ref} className="h-10" />
    </div>
  );
};

export default HomePage;

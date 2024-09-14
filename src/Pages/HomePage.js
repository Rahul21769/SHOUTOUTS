import React, { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import ResultsGrid from "../Components/ResultGrid";
import { searchPhotos, searchVideos } from "../Service/api";
//import Logo from "../Images/Logo.png";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [type, setType] = useState("images");
  const [query, setQuery] = useState("nature"); // Default query
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    const fetchDefaultContent = async () => {
      setLoading(true);
      try {
        let newResults;
        if (type === "images") {
          newResults = await searchPhotos(query, page);
        } else if (type === "videos") {
          newResults = await searchVideos(query, page);
        }

        if (newResults.length === 0) {
          setHasMore(false);
        }

        setResults((prevResults) => [...prevResults, ...newResults]);
      } catch (error) {
        console.error("Error fetching default content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDefaultContent();
  }, [type, page, query]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setResults([]);
    setHasMore(true);
  };

  const handleReset = async () => {
    setType("images");
    setResults([]);
    setQuery("nature");
    setPage(1);
    setHasMore(true);
  };

  return (
    <div className="container mx-auto bg-gray-700 p-4 h-[500px] overflow-y-scroll">
      <div className="flex mt-4 mb-4 pl-5 bg-gray-800 py-0 px-0 rounded-lg items-center justify-between">
        <div className="flex items-center space-x-4 h-20 ml-4">
          {/* <img */}
            {/* src={Logo} */}
            {/* alt="Logo" */}
            {/* className="h-20 w-20" */}
          {/* /> */}

          <div className="flex space-x-2  ">
            <button
              className={`${
                type === "images"
                  ? "bg-slate-500 text-white"
                  : "text-white"
              } h-8 w-24 px-0 py-0 rounded-lg focus:outline-none hover:bg-opacity-90 transition-all duration-200`}
              onClick={() => {
                setType("images");
                setResults([]);
                setPage(1);
                setHasMore(true);
              }}
            >
              Images
            </button>
            <button
              className={`${
                type === "videos"
                  ? "bg-slate-500 text-white"
                  : "text-white"
              } h-8 w-24 px-0 py-0 rounded-lg focus:outline-none hover:bg-opacity-90 transition-all duration-200`}
              onClick={() => {
                setType("videos");
                setResults([]);
                setPage(1);
                setHasMore(true);
              }}
            >
              Videos
            </button>
          </div>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} />
      {results.length === 0 && !loading && (
        <p className="text-center text-white mt-4">No results found.</p>
      )}
      <ResultsGrid results={results} type={type} />

      <div ref={ref} className="my-4">
        {loading && <p className="text-white">Loading more results...</p>}
        {!hasMore && !loading && results.length > 0 && (
          <p className="text-white">No more results to show.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

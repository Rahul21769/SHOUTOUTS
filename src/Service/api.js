// src/services/api.js
import axios from 'axios';

const API_KEY = 'Wc7p2mQsE2IQCzbeBi0nuAI0kr1jCSuYyroEkgaUnEkgOMsCapMLObX2'; // Replace with your Pexels API Key
const BASE_URL = 'https://api.pexels.com/v1';

export const searchPhotos = async (query) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    headers: {
      Authorization: API_KEY,
    },
    params: {
      query,
      per_page: 15,
    },
  });
  return response.data.photos;
};

export const searchVideos = async (query) => {
  const response = await axios.get(`${BASE_URL}/videos/search`, {
    headers: {
      Authorization: API_KEY,
    },
    params: {
      query,
      per_page: 15,
    },
  });
  return response.data.videos;
};

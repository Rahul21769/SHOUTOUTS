// src/App.js
import React from 'react';
import HomePage from './Pages/HomePage';
import './App.css'; // If this file still contains any custom styles you want to keep

const App = () => {
  return (
    <div className="App bg-gray-700"> {/* Tailwind equivalent for bg-secondary */}
      <HomePage className='bg-blue-500' /> {/* Tailwind equivalent for bg-primary */}
    </div>
  );
};

export default App;

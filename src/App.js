// src/App.js
import React from 'react';
import Modal from './Components/Modal';
import './App.css'; // If this file still contains any custom styles you want to keep

const App = () => {
  return (

    <div className="App flex items-center justify-center min-h-screen bg-secondary">
    <Modal/> {/* Tailwind equivalent for bg-secondary */}
    </div>
  );
};

export default App;

// src/App.tsx
import React from 'react';
import './App.css';
import BookSearch from './components/BookSearch';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>📘 Book Search App</h1>
      <BookSearch />
    </div>
  );
};

export default App;

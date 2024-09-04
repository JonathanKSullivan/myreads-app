import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchInput.css';

const SearchInput = ({ query, setQuery }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search books by title, author, or ISBN..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchInput;

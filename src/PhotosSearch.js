import React, { useState } from 'react';

export const PhotosSearch = ({ onKeyPress }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTextChanged = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  return (
    <div id="photosSearch">
      <h1>Unplash</h1>
      <p>
        The internet's source of <a href="/">freely-usable images</a>.<br />
        Powered by creators everywhere.
      </p>
      <input
        type="search"
        placeholder="Search free high-resolution photos"
        value={searchTerm}
        onChange={handleSearchTextChanged}
        onKeyPress={onKeyPress}
      ></input>
      <span>Trending: flowers, wallpapers, background, happy, love.</span>
    </div>
  );
};
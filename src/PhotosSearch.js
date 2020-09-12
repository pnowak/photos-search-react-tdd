import React, { useState } from 'react';

export const PhotosSearch = ({ onKeyPress }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTextChanged = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  return (
    <div id="photosSearch">
      <input
        type="search"
        placeholder="Search free high-resolution photos"
        value={searchTerm}
        onChange={handleSearchTextChanged}
        onKeyPress={onKeyPress}
      ></input>
    </div>
  );
};
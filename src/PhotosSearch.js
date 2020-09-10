import React, { useEffect, useState } from 'react';

export const PhotosSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [enterSearchTerm, setEnterSearchTerm] = useState('');

  const handleSearchTextChanged = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  const handleEnterKeyPress = ({ key, target: { value } }) => {
    if (key === 'Enter') {
      setEnterSearchTerm(value);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (enterSearchTerm.length >= 3) {
        const response = await window.fetch(
          `https://api.unsplash.com/search/photos?page=1&query=${enterSearchTerm}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept-Version': 'v1',
              Authorization:
                'Client-ID 1Tp3BgB50l24P2tMh4hITZoCtVA2PxyXBfR1S4og6H4',
            },
          }
        );

        const data = await response.json();
        console.log(data.results);
      }
    };

    fetchData();
  }, [enterSearchTerm]);

  return (
    <div id="photosSearch">
      <input
        type="search"
        placeholder="Search free high-resolution photos"
        value={searchTerm}
        onChange={handleSearchTextChanged}
        onKeyPress={handleEnterKeyPress}
      ></input>
    </div>
  );
}
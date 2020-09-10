import React, { useEffect, useState } from 'react';

export const PhotosSearchResult = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [enterSearchTerm, setEnterSearchTerm] = useState('');
  const [searchedPhotos, SetSearchedPhotos] = useState([]);

  const handleSearchTextChanged = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  const handleEnterKeyPress = ({ key, target: { value } }) => {
    if (key === 'Enter') {
      setEnterSearchTerm(value);
    }
  };

  const Tags = ({ tags }) => {
    return (
      <ol>
        {tags.map(tag => (
          <li key={tag.title}>
            <span>{tag.title}</span>
          </li>
        ))}
      </ol>
    );
  }

  const DisplaySearchedPhoto = ({ photos }) => {
    return (
      <div id="photos">
        <ul>
          {photos.map(photo => (
            <li key={photo.id}>
              <img src={photo.links.download} width={100} height={100} />
              <Tags tags={photo.tags} />
            </li>
          ))}
        </ul>
      </div>
    );
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
        SetSearchedPhotos(data.results);
      }
    };

    fetchData();
  }, [enterSearchTerm]);

  return (
    <div id="photosSearchResult">
      <input
        type="search"
        placeholder="Search free high-resolution photos"
        value={searchTerm}
        onChange={handleSearchTextChanged}
        onKeyPress={handleEnterKeyPress}
      ></input>
      <h2 id="searchedTerm">{enterSearchTerm}</h2>
      <DisplaySearchedPhoto photos={searchedPhotos} />
    </div>
  );
}
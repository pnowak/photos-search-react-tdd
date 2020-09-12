import React, { useEffect, useState } from 'react';
import { PhotosSearchResult } from './PhotosSearchResult';

export const PhotosSearchResultLoader = ({value, onFocus}) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enterSearchTerm, setEnterSearchTerm] = useState('');
  const [searchedPhotos, setSearchedPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (value.length >= 3) {
          const response = await window.fetch(
            `https://api.unsplash.com/search/photos?page=1&query=${value}`,
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

          setEnterSearchTerm(value);
          setSearchedPhotos(data.results);
        }
      } catch (error) {
        setError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [enterSearchTerm, value]);

  return (
    <PhotosSearchResult
      error={error}
      enterSearchTerm={enterSearchTerm}
      isLoading={isLoading}
      onFocus={onFocus}
      searchedPhotos={searchedPhotos}
    />
  );
};

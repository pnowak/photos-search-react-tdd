import React, { useCallback, useState } from 'react';
import WebFont from 'webfontloader';
import { PhotosSearch } from './PhotosSearch';
import { PhotosSearchResultLoader } from './PhotosSearchResultLoader';
import './styles/App.scss';

WebFont.load({
  google: {
    families: ['Roboto:300,400,700', 'sans-serif'],
  },
});

export const App = () => {
  const [view, setView] = useState('photoSearchView');
  const [searchTerm, setSearchTerm] = useState('');
  
  const transitionToPhotoSearchResultLoader = useCallback(({ target, key }) => {
    if (key === 'Enter') {
      setSearchTerm(target.value);
      setView('photoSearchViewResultLoader');
    }
  }, []);

  const transitionToPhotoSearch = useCallback(() => {
    setView('photoSearchView');
  }, []);

  switch (view) {
    case 'photoSearchViewResultLoader':
      return (
        <PhotosSearchResultLoader
          value={searchTerm}
          onFocus={transitionToPhotoSearch}
        />
      );
    default:
      return <PhotosSearch onKeyPress={transitionToPhotoSearchResultLoader} />;
  }
}
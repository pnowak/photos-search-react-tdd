import React, { useEffect, useState } from 'react';

export const PhotosSearchResult = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [enterSearchTerm, setEnterSearchTerm] = useState('');
  const [searchedPhotos, setSearchedPhotos] = useState([]);
  const [modalPhoto, setModalPhoto] = useState(null);
  const [isShow, setIsShow] = useState(false);

  const handleSearchTextChanged = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  const handleEnterKeyPress = ({ key, target: { value } }) => {
    if (key === 'Enter') {
      setEnterSearchTerm(value);
    }
  };

  const handleShowDialog = ({target}) => {
    const modalPhoto = searchedPhotos.filter(photo => photo.id === target.id);

    setIsShow(!isShow);
    setModalPhoto(modalPhoto[0]);
  };

  const handleHideDialog = () => {
    setIsShow(!isShow);
    setModalPhoto(null);
  }

  const Modal = ({ modalPhoto }) => {
    const {
      description,
      user: { name, profile_image, twitter_username },
      links: { download },
    } = modalPhoto;

    return (
      <div id="modal">
        <div id="user">
          <span>{name}</span>
          <img src={profile_image.small} />
          <span>{`@${twitter_username}`}</span>
        </div>
        <img
          src={download}
          width={500}
          height={500}
          onClick={handleHideDialog}
        />
        <p>{description}</p>
      </div>
    );
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
  };

  const DisplaySearchedPhoto = ({ photos, handleShowDialog }) => {
    return (
      <div id="photos">
        <ul>
          {photos.map(photo => (
            <li key={photo.id}>
              <img
                src={photo.links.download}
                width={200}
                height={200}
                id={photo.id}
                onClick={handleShowDialog}
              />
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
        
        setSearchedPhotos(data.results);
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
      <DisplaySearchedPhoto
        photos={searchedPhotos}
        handleShowDialog={handleShowDialog}
      />
      {isShow ? <Modal modalPhoto={modalPhoto} /> : null}
    </div>
  );
}
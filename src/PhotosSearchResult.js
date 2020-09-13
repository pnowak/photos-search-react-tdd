import React, { useState } from 'react';

export const PhotosSearchResult = ({ enterSearchTerm, error, isLoading, searchedPhotos, onFocus }) => {
  const [modalPhoto, setModalPhoto] = useState(null);
  const [isShow, setIsShow] = useState(false);

  const handleSearchTextChanged = ({ target: { value } }) => value;

  const handleShowDialog = ({ target }) => {
    const modalPhoto = searchedPhotos.filter(photo => photo.id === target.id);

    setIsShow(!isShow);
    setModalPhoto(modalPhoto[0]);
  };

  const handleHideDialog = () => {
    setIsShow(!isShow);
    setModalPhoto(null);
  };

  const Error = () => <div className="error">An error occurred during save.</div>;

  const Loading = () => <div>Loading ...</div>;

  const Modal = ({ modalPhoto }) => {
    const {
      description,
      user: { name, profile_image, twitter_username },
      links: { download },
    } = modalPhoto;

    return (
      <div id="modal">
        <div id="wrapper">
          <div id="user">
            <img src={profile_image.small} />
            <span>{name}</span><br />
            <span>{`@${twitter_username}`}</span>
          </div>
          <img src={download} onClick={handleHideDialog} />
          <p>{description}</p>
        </div>
      </div>
    );
  };

  const Tags = ({ tags }) => {
    return (
      <ol>
        {tags.map(tag => (
          <li key={tag.title} className="tag">
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

  return (
    <div id="photosSearchResult">
      {error ? <Error /> : null}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <input
            type="search"
            value={enterSearchTerm}
            onFocus={onFocus}
            onChange={handleSearchTextChanged}
          ></input>
          <h1>{enterSearchTerm}</h1>
          <DisplaySearchedPhoto
            photos={searchedPhotos}
            handleShowDialog={handleShowDialog}
          />
          {isShow ? <Modal modalPhoto={modalPhoto} /> : null}
        </>
      )}
    </div>
  );
};
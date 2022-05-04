import React, { useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = useState("");
  function handleNameChange(e) {
    setName(e.target.value);
  }

  const [link, setLink] = useState("");
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit(name, link);
  }

  return (
    <PopupWithForm
      title="New place"
      name="add-card"
      submitButtonText="Create"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="title-input"
        placeholder="Title"
        className="popup__form-input popup__form-input_type_title"
        minLength="1"
        maxLength="30"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <p className="popup__form-input-error" id="title-input-error" />
      <input
        type="url"
        name="link"
        id="url-input"
        placeholder="Image link"
        className="popup__form-input popup__form-input_type_image-link"
        value={link || ""}
        onChange={handleLinkChange}
        required
      />
      <p className="popup__form-input-error" id="url-input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;

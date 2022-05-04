import React, { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  const [description, setDescription] = useState("");

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Edit profile"
      name="edit-profile"
      submitButtonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="fullName"
        id="name-input"
        placeholder="Name"
        className="popup__form-input popup__form-input_type_name"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <p className="popup__form-input-error" id="name-input-error" />
      <input
        type="text"
        name="profession"
        id="profession-input"
        placeholder="About me"
        className="popup__form-input popup__form-input_type_profession"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleDescriptionChange}
        required
      />
      <p className="popup__form-input-error" id="profession-input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;

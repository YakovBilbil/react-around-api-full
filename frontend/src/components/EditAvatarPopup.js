import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatar);
  }

  return (
    <PopupWithForm
      title="Change profile picture"
      name="edit-avatar"
      submitButtonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="link"
        id="avatar-url-input"
        placeholder="Profile picture link"
        className="popup__form-input popup__form-input_type_image-link"
        value={avatar || ""}
        onChange={handleAvatarChange}
        required
      />
      <p className="popup__form-input-error" id="avatar-url-input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

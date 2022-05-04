import Popup from "./Popup";

function PopupWithForm({
  name,
  isOpen,
  title,
  children,
  submitButtonText,
  onClose,
  onSubmit,
  popupFormNewClass,
  popupFormTitleNewClass,
  popupFormSaveButtonNewClass,
  popupFormCloseButtonNewClass,
}) {
  return (
    <Popup
      isOpen={isOpen}
      name={name}
      onClose={onClose}
      popupFormCloseButtonNewClass={popupFormCloseButtonNewClass}
    >
      <div className={`popup__form ${popupFormNewClass}`}>
        <form
          className="popup__form-submit"
          name={`popup_${name}`}
          onSubmit={onSubmit}
        >
          <h2 className={`popup__form-title ${popupFormTitleNewClass}`}>
            {" "}
            {`${title}`}{" "}
          </h2>
          {children}{" "}
          <button
            type="submit"
            className={`popup__form-save-button ${popupFormSaveButtonNewClass}`}
          >
            {" "}
            {`${submitButtonText}`}{" "}
          </button>{" "}
        </form>{" "}
      </div>{" "}
    </Popup>
  );
}

export default PopupWithForm;

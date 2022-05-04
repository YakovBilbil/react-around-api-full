import Popup from "./Popup";

function ImagePopup({
  popupName,
  isCardPopupOpen,
  cardForImagePopup,
  onClose,
}) {
  return (
    <Popup isOpen={isCardPopupOpen} name={popupName} onClose={onClose}>
      <div className="popup__form popup__image">
        <img
          className="popup__image-photo"
          src={`${cardForImagePopup.link}`}
          alt={`A Card named ${cardForImagePopup.name}`}
        />
        <p className="popup__image-title">{`${cardForImagePopup.name}`}</p>
      </div>
    </Popup>
  );
}

export default ImagePopup;

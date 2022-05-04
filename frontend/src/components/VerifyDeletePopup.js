import PopupWithForm from "./PopupWithForm";

function VerifyDeletePopup({
  isOpen,
  cardForDelete,
  onClose,
  onConfirmDeleteClick,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmDeleteClick(cardForDelete);
  }

  return (
    <PopupWithForm
      title="Are you sure?"
      name="verify-card-delete"
      submitButtonText="Yes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default VerifyDeletePopup;

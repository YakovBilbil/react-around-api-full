import Popup from "./Popup";

import registerSuccess from "../images/register_success.svg";
import registerFail from "../images/register_fail.svg";

const RegistraionSuccededContent = () => {
  return (
    <>
      <img src={registerSuccess} alt="Register Success icon" />
      <h2 className="popup__form-info-tool-text">
        Success! You have now been registered.
      </h2>
    </>
  );
};

const RegistraionFailedContent = () => {
  return (
    <>
      <img src={registerFail} alt="Register Fail icon" />
      <h2 className="popup__form-info-tool-text">
        Oops, something went wrong! Please try again.
      </h2>
    </>
  );
};

const InfoTooltip = ({
  popupName,
  isOpen,
  onClose,
  isRegistrationSucceeded,
  popupFormCloseButtonNewClass = "popup__form-close-button_info-tool",
}) => {
  return (
    <Popup
      isOpen={isOpen}
      name={popupName}
      onClose={onClose}
      isRegistrationSucceeded={isRegistrationSucceeded}
      popupFormCloseButtonNewClass={popupFormCloseButtonNewClass}
    >
      <div className="popup__form">
        <div className="popup__form-submit popup__form-submit-info-tool">
          {isRegistrationSucceeded ? (
            <RegistraionSuccededContent />
          ) : (
            <RegistraionFailedContent />
          )}
        </div>
      </div>
    </Popup>
  );
};

export default InfoTooltip;

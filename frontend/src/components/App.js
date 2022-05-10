import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import VerifyDeletePopup from "./VerifyDeletePopup";

import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    (async function () {
      try {
        const userInfo = await api.getUserInfo();
        setCurrentUser(userInfo);
      } catch (error) {
        console.log("CAUGHT ERROR", error);
      }
    })();
  }, []);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const cardsData = await api.getInitialCards();
        setCards(cardsData);
      } catch (error) {
        console.log("CAUGHT ERROR", error);
      }
    })();
  }, []);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  const handleUpdateAvatar = (avatar) => {
    (async function () {
      try {
        const updatedAvatar = await api.changeProfilePicture(avatar);
        setCurrentUser(updatedAvatar);
        closeAllPopups();
      } catch (error) {
        console.log("CAUGHT ERROR", error);
      }
    })();
  };

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  const handleUpdateUser = ({ name, about }) => {
    (async function () {
      try {
        const updatedUserInfo = await api.editProfile({ name, about });
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      } catch (error) {
        console.log("CAUGHT ERROR", error);
      }
    })();
  };

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  async function handleAddPlaceSubmit(name, link) {
    try {
      const newCard = await api.addCard(name, link);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.log("CAUGHT ERROR", error);
    }
  }

  const [cardForDelete, setCardForDelete] = useState({});
  const [isVerifyDeletePopupOpen, setIsVerifyDeletePopupOpen] = useState(false);
  function handleTrashClick(cardForDelete) {
    setIsVerifyDeletePopupOpen(true);
    setCardForDelete(cardForDelete);
  }
  async function handleCardDelete(cardForDelete) {
    try {
      await api.deleteCard(cardForDelete._id);
      setCards((cards) => cards.filter((c) => c._id !== cardForDelete._id));
      closeAllPopups();
    } catch (error) {
      console.log("CAUGHT ERROR", error);
    }
  }

  const [cardForImagePopup, setCardForImagePopup] = useState({});
  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);
  function handleCardClick(cardForImagePopup) {
    setIsCardPopupOpen(true);
    setCardForImagePopup(cardForImagePopup);
  }

  async function handleCardLike(card) {
    try {
      const isLiked = card.likes.some((i) => i._id === currentUser._id);
      const newCard = await api.changeLikeCardStatus(card._id, isLiked);
      setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.log("CAUGHT ERROR", error);
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsCardPopupOpen(false);
    setIsVerifyDeletePopupOpen(false);
    setCardForDelete({});
    setCardForImagePopup({});
    setIsInfoTooltipOpen(false);
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const navigate = useNavigate();

  const handleAuthorizeSubmit = async () => {
    try {
      const res = await auth.authorize(values.email, values.password);
      if (res) {
        setIsLoggedIn(true);
        navigate("/react-around-auth/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [isRegistrationSucceeded, setIsRegistrationSucceeded] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const handleRegisterSubmit = async () => {
    try {
      const res = await auth.register(values.email, values.password);
      if (res) {
        setIsRegistrationSucceeded(true);
        navigate("/react-around-auth/signin");
      }
    } catch (err) {
      setIsRegistrationSucceeded(false);
      console.log(err);
    }
    setIsInfoTooltipOpen(true);
  };

  useEffect(() => {
    (async function () {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        try {
          const res = await auth.checkTokenAndGetUserEmail(jwt);
          if (res) {
            setIsLoggedIn(true);
            setValues({
              email: `${res.data.email}`,
            });
          }
        } catch (error) {
          console.log("CAUGHT ERROR", error);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/react-around-auth/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Routes>
            <Route
              path="/react-around-auth/"
              element={
                <ProtectedRoute
                  element={
                    <>
                      <Header>
                        <div className="header__log-out-mail-block">
                          <div className="header__mail">{`${values.email}`}</div>
                          <div
                            className="header__sign-button"
                            onClick={() => {
                              setIsLoggedIn(false);
                              setValues({
                                email: "",
                                password: "",
                              });
                              navigate("/react-around-auth/signin");
                            }}
                          >
                            Log Out
                          </div>
                        </div>
                      </Header>
                      <Main
                        onEditAvatarClick={handleEditAvatarClick}
                        onEditProfileClick={handleEditProfileClick}
                        onAddPlaceClick={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onTrashClick={handleTrashClick}
                        onCardDelete={handleCardDelete}
                      />
                      <Footer />
                    </>
                  }
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path="/react-around-auth/signup"
              element={
                <Register
                  onChange={handleChange}
                  onSubmit={handleRegisterSubmit}
                />
              }
            />

            <Route
              path="/react-around-auth/signin"
              element={
                <Login
                  onChange={handleChange}
                  onSubmit={handleAuthorizeSubmit}
                />
              }
            />
          </Routes>
        </div>

        <InfoTooltip
          popupName={"registration-info"}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegistrationSucceeded={isRegistrationSucceeded}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <VerifyDeletePopup
          isOpen={isVerifyDeletePopupOpen}
          cardForDelete={cardForDelete}
          onClose={closeAllPopups}
          onConfirmDeleteClick={handleCardDelete}
        />

        <ImagePopup
          popupName={"card-image"}
          isCardPopupOpen={isCardPopupOpen}
          cardForImagePopup={cardForImagePopup}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

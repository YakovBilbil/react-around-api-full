import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onTrashClick }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? "" : "not-visible"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__heart ${
    isLiked ? "card__heart_active" : ""
  }`;

  return (
    <li className="card">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={() => onTrashClick(card)}
      />
      <img
        className="card__picture"
        src={card.link}
        alt={`A Card named ${card.name}`}
        onClick={() => onCardClick(card)}
      />
      <div className="card__name-heart">
        <h2 className="card__name">{`${card.name}`}</h2>
        <div className="card__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
          />
          <p className="card__likes-amount">{`${card.likes.length}`}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;

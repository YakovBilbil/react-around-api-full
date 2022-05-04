import express from "express";
import { getCards, createCard, deleteCardById, likeCard, dislikeCard } from "../controllers/cards.mjs";
import { celebrate, Joi } from "celebrate";
import { validateURL } from "../utils/config.mjs";

const router = express.Router();

router.get("/", celebrate({
    headers: Joi.object().keys({}).unknown(true)
}), getCards);

router.post("/", celebrate({
    headers: Joi.object().keys({}).unknown(true),
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().custom(validateURL),
        owner: Joi.required(),
        createdAt: Joi.string().required().date()
    })
}), createCard);

router.delete("/:card_id", celebrate({
    headers: Joi.object().keys({}).unknown(true)
}), deleteCardById);

router.put("/:card_id/likes", celebrate({
    headers: Joi.object().keys({}).unknown(true)
}), likeCard);

router.delete("/:card_id/likes", celebrate({
    headers: Joi.object().keys({}).unknown(true)
}), dislikeCard);

export default router;
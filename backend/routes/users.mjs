import express from "express";
import {
    getUsers,
    getUserData,
    updateUserProfile,
    updateUserAvatar,
} from "../controllers/users.mjs";
import { celebrate, Joi } from "celebrate";
import { validateURL } from "../utils/config.mjs";

const router = express.Router();

router.get("/", celebrate({
    headers: Joi.object().keys({}).unknown(true),
}), getUsers);

router.get("/me", celebrate({
        headers: Joi.object().keys({}).unknown(true)
    }),
    getUserData);

router.patch("/me", celebrate({
    headers: Joi.object().keys({}).unknown(true),
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().custom(validateURL),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }),
}), updateUserProfile);

router.patch("/me/avatar", celebrate({
    headers: Joi.object().keys({}).unknown(true),
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().custom(validateURL),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }),
}), updateUserAvatar);

export default router;
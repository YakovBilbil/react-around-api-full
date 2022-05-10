import express from "express";
import usersRouter from "./users.mjs";
import cardsRouter from "./cards.mjs";
import auth from "../middlewares/auth.mjs";
import { createUser, login } from "../controllers/users.mjs";
import { NotFoundError } from "../utils/errorsHandle.mjs";
import { celebrate, Joi } from "celebrate";
import { validateURL } from "../utils/config.mjs";

const router = express.Router();

router.post("/signup", celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().custom(validateURL),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }),
}), createUser);

router.post("/signin", celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30),
        avatar: Joi.string().custom(validateURL),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }),
}), login);

router.use(auth);

router.use("/users", usersRouter);

router.use("/cards", cardsRouter);

router.use(() => {
    throw new NotFoundError("Requested resource not found");
});



export default router;
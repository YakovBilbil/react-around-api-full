import Card from "../models/card.mjs";
import {
    INVALID_DATA_ERROR,
    NOT_FOUND_ERROR,
    handleCatchErrors,
} from "../utils/errorsHandle.mjs";

const getCards = async(req, res) => {
    try {
        const cards = await Card.find({});
        res.send(cards);
    } catch (error) {
        handleCatchErrors(error, res);
    }
};

const createCard = async(req, res) => {
    try {
        const { name, link } = req.body;
        const newCard = await Card.create({
            name,
            link,
            owner: req.user._id,
        });
        if (!newCard) {
            res.status(INVALID_DATA_ERROR).send({
                message: "invalid data passed to the methods for creating a card",
            });
        } else {
            res.send(newCard);
        }
    } catch (error) {
        handleCatchErrors(error, res);
    }
};

const deleteCardById = async(req, res) => {
    try {
        const card = await Card.findOne({ _id: req.params.card_id });
        if (!card) {
            res.status(NOT_FOUND_ERROR).send({
                message: "Card ID not found",
            });
        } else {
            if (req.user._id === card.owner) {
                const cardToDelete = await Card.findOneAndRemove({ _id: req.params.card_id });
                res.send(cardToDelete);
            } else {
                res.send({
                    message: "Card is not owned by the User"
                });
            }
        }
    } catch (error) {
        handleCatchErrors(error, res);
    }
};

const likeCard = async(req, res) => {
    try {
        const card = await Card.findOneAndUpdate({ _id: req.params.card_id }, { $addToSet: { likes: req.user._id } }, { new: true });
        if (!card) {
            res.status(NOT_FOUND_ERROR).send({
                message: "Card ID not found",
            });
        } else {
            res.send(card);
        }
    } catch (error) {
        handleCatchErrors(error, res);
    }
};

const dislikeCard = async(req, res) => {
    try {
        const card = await Card.findOneAndUpdate({ _id: req.params.card_id }, { $pull: { likes: req.user._id } }, { new: true });
        if (!card) {
            res.status(NOT_FOUND_ERROR).send({
                message: "Card ID not found",
            });
        } else {
            res.send(card);
        }
    } catch (error) {
        handleCatchErrors(error, res);
    }
};

export { getCards, createCard, deleteCardById, likeCard, dislikeCard };
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.mjs";


export const createUser = async(req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            email: req.body.email,
            password: hash,
        })
        res.send(user);
    } catch (err) {
        res.status(400).send(err)
    }
}


export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findUserByCredentials(email, password);
        const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: "1h" });
        res.send({ token });
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
};

/*
const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return Promise.reject(new Error('Incorrect password or email'));
        } else {
            const matched = await bcrypt.compare(password, user.password);
            if (!matched) {
                return Promise.reject(new Error('Incorrect password or email'));
            } else {
                res.send({ message: 'Everything good!' });
            }
        }
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
};
*/
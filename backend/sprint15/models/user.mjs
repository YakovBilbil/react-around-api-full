// models/user.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

const findUserByCredentials = async(email, password) => {
    const user = await this.findOne({ email });
    if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
    } else {
        const matched = bcrypt.compare(password, user.password);
        if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
        } else {
            return user;
        }
    }
};

userSchema.statics.findUserByCredentials = findUserByCredentials;

export default mongoose.model('user', userSchema);

/*
userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
    } else {
        return bcrypt.compare(password, user.password);
    }
};
*/
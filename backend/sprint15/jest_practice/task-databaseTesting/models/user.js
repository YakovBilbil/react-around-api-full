const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: 'email is required',
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'invalid email format',
    },
  },
  password: {
    type: String,
    required: 'password is required',
    select: false,
  },
  name: {
    type: String,
    required: 'name is required',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: 'about is required',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => isURL(v),
      message: 'avatar must be a URL',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);

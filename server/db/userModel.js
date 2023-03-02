const mongoose = require('mongoose');
const { isEmail } = require('validator)';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user must have a name'],
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, 'A user must have an email'],
      validate: [isEmail, 'Please provide a valid email address'],
      index: true,
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'A user must have a name'],
      required: [true, 'Please provide a password'],
      minlength: 8,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

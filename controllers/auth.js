//import the user model
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('Email already in use');
  }

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create a new user

  const user = await User.create({ name, email, password: hashedPassword });

  //create a token
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  //return the new user

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, email: user.email }, token });
};

const Login = async (req, res) => {
  res.send('Login User');
};

module.exports = {
  Register,
  Login,
};

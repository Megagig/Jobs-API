//import the user model
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const bcrypt = require('bcryptjs');

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

  //return the new user

  res.status(StatusCodes.CREATED).json({ user });
};

const Login = async (req, res) => {
  res.send('Login User');
};

module.exports = {
  Register,
  Login,
};

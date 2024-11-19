//import the user model
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

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
  // const token = jwt.sign(
  //   { userId: user._id, name: user.name },
  //   process.env.JWT_SECRET,
  //   {
  //     expiresIn: process.env.JWT_LIFETIME,
  //   }
  // );

  const token = generateToken(user);

  //return the new user

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, email: user.email }, token });
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  //validate the user
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  //check if the user exists
  const user = await User.findOne({ email });

  //At this time, we have 2 options: we check if user exists or not, if user exists, awesome we can send back the response, create token and send it back to the user.
  // If user does not exist, we throw an error. We can use the UnauthenticatedError class we created earlier because in this case, the user is not providing valid token.
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }
  // //compare the password

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  // //create a token
  token = generateToken(user);

  //return the user
  res.status(StatusCodes.OK).json({
    user: { name: user.name, email: user.email },
    token,
  });
};

module.exports = {
  Register,
  Login,
};

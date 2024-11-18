//import the user model
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const Register = async (req, res) => {
  const { name, email, password } = req.body;

  //ERROR HANDLING: 1st way: CONTROLLER ERROR HANDLING

  //validate if the user has entered all the required fields
  // if (!name || !email || !password) {
  //   throw new BadRequestError('Please provide all values');
  // }

  const user = await User.create({ ...req.body });

  //check if user already exists
  res.status(StatusCodes.CREATED).json({ user });
};

const Login = async (req, res) => {
  res.send('Login User');
};

module.exports = {
  Register,
  Login,
};

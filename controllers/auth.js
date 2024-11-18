const Register = async (req, res) => {
  res.send('Register User');
};

const Login = async (req, res) => {
  res.send('Login User');
};

module.exports = {
  Register,
  Login,
};

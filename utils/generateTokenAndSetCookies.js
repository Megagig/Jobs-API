const jwt = require('jsonwebtoken');

const generateTokenAndSetCookies = (res, user) => {
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );

  // Set the token in the cookies
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  });

  return token;
};

module.exports = generateTokenAndSetCookies;

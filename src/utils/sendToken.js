const jwt = require('jsonwebtoken');

const PROCESS = process.env;

const sendToken = (user) => {
  const token = jwt.sign({ id: user.id }, PROCESS.JWT_KEY, {
    expiresIn: PROCESS.JWT_EXPIRES_TIME,
  });
  return token;
};
const resetToken = (user) => {
  const token = jwt.sign({ id: user.id }, PROCESS.RESET_JWT_KEY, {
    expiresIn: PROCESS.JWT_RESET_EXPIRES_TIME,
  });
  return token;
};
const jwtVerify = async (token, key) => {
  const decoded = await jwt.verify(token, key);
  return decoded;
};
module.exports = {
  sendToken,
  resetToken,
  jwtVerify,
};

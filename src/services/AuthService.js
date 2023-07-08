/* eslint-disable class-methods-use-this */
const bcrypt = require('bcryptjs');
const { sendToken, resetToken, jwtVerify } = require('../utils/sendToken');
const ErrorHandler = require('../utils/ErrorHandler');
const next = require('../../middleware/error');

class AuthService {
  constructor() {
    this.login = this.login.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async login(email, password, UserModel) {
    try {
      let data = {};
      const User = UserModel;
      if (!email || !password) {
        return ErrorHandler(400, 'Please enter Email or Password');
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return ErrorHandler(404, 'Invalid Email', false, email);
      }
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return ErrorHandler(404, 'Invalid Email or Password', false, email);
      }
      data = { ...user.dataValues };
      delete data.password;

      const token = sendToken(user);
      return {
        success: true,
        message: 'login success!',
        data: {
          user: data,
        },
        token,
        status: 200,
      };
    } catch (error) {
      return next(error);
    }
  }

  async forgotPassword(email, url, UserModel) {
    try {
      const User = UserModel;
      if (!email) {
        return ErrorHandler(400, 'email is required');
      }
      const user = await User.findOne({
        where: { email },
        attributes: ['id'],
      });
      if (!user) {
        return ErrorHandler(400, 'Invalid email', false, email);
      }
      const token = resetToken(user);
      const link = `${url}?token=${token}`;
      return {
        success: true,
        message: `Reset password link sent to ${email}`,
        data: { link },
        status: 200,
      };
    } catch (error) {
      return next(error);
    }
  }

  async resetPassword(password, confirmPassword, token, UserModel) {
    try {
      const User = UserModel;
      if (!password || !confirmPassword) {
        return ErrorHandler(400, 'Please enter password or confirm password');
      }
      if (password !== confirmPassword) {
        return ErrorHandler(400, 'Password and confirm password not matched');
      }
      const decoded = await jwtVerify(token, process.env.RESET_JWT_KEY);

      const salt = await bcrypt.genSalt(10);
      const cryptPassword = await bcrypt.hash(password, salt);

      const user = await User.update(
        { password: cryptPassword },
        {
          where: { id: decoded.id },
        }
      );
      if (user[0] === 1) {
        return {
          success: true,
          message: 'Password Reset!',
          status: 200,
        };
      }
      throw new Error('something went wrong');
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = AuthService;

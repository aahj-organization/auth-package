// const AppDao = require('./src/dao/models/AppDao');

require('dotenv').config();

// const PROCESS = process.env;
// const { DB_URL } = PROCESS;
// const DAO = new AppDao(DB_URL);

const AuthService = require('./src/services/AuthService');

module.exports = new AuthService();

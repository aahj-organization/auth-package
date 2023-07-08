/* eslint-disable no-console */

function ErrorHandler(statusCode, message, success = false, ...rest) {
  if (arguments.length > 3) {
    console.error(`${message} -> ${rest}`);
  } else {
    console.error(message);
  }
  return {
    success,
    message,
    status: statusCode,
  };
}

module.exports = ErrorHandler;

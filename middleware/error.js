/* eslint-disable no-console */

function next(err) {
  let message = '';
  let statusCode;

  if (err.response) {
    console.error(JSON.stringify(err.response.data));
    return {
      success: false,
      message: err.response.data.message,
      status: Number(err.response.status) || 500,
    };
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    message = Object.values(err.errors)[0].message;
    statusCode = 400;
  }
  if (err.name === 'SequelizeValidationError') {
    message = Object.values(err.errors)[0].message;
    statusCode = 400;
  }
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    message = `${err.index} error`;
    statusCode = 400;
  }
  if (err.name === 'SequelizeDatabaseError') {
    message = err.message;
    statusCode = 400;
  }

  if (message.length > 1) {
    console.error(message);
  }
  if (err.errors) {
    console.error(JSON.stringify(err.errors));
  }
  console.error(new Error(err));
  return {
    success: false,
    status: statusCode || 500,
    message: message.length > 1 ? message : err.message,
  };
  // return res.status(statusCode || 500).json({
  //   success: false,
  //   message: message.length > 1 ? message : err.message,
  // });
}

module.exports = next;

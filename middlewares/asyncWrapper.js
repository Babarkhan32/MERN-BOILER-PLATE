const { isNil, isEmpty } = require("lodash");

const defaultMessage = "Something went wrong.\nPlease try again";
const defaultStatus = 500;

const handelError = (error) => {
  try {
    let status = error.status ? error.status : 500;

    if (error.response && error.response.status) {
      status = error.response.status;
    }

    let message =
      isNil(error.message) || isEmpty(error.message)
        ? defaultMessage
        : error.message;

    if (error && error.original && error.original.code) {
      message = error.original.code;
    }

    message =
      message.constructor === Object || message.constructor === Array
        ? JSON.stringify(message)
        : message;

    return { status, message };
  } catch (error) {
    return {
      status: defaultStatus,
      message: defaultMessage,
    };
  }
};

module.exports = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    req.log.error(error);
    let { status = defaultStatus, message = defaultMessage } = handelError(
      error
    );

    res.status(status).send(message);
  }
};
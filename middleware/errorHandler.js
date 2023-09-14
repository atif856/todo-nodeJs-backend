const {constants} = require("../constants");
const errorHandler = (err, req, resp, next) => {
    const statusCode = resp.statusCode ? resp.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            resp.json({
                title: "Validation error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
            case constants.NOT_FOUND:
            resp.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            case constants.UNAUTHORIZED:
            resp.json({
                title: "Un Authorized",
                message: err.message,
                stackTrace: err.stack
            });
            case constants.FORBIDDEN:
            resp.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            case constants.SERVER_ERROR:
            resp.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
        default:
            console.log("No Error, All good!")
            break;
    }
};

module.exports = errorHandler;
// Responsible for centralized error handling and formatting error responses across the application.

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    let message = err.message || "Internal Server Error";

    // Mongoose validation errors
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((error) => error.message)
            .join(", ");
    }

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID";
    }

    res.status(statusCode).json({
        success: false,
        message:
            process.env.NODE_ENV === "production" && statusCode === 500
                ? "Internal Server Error"
                : message,
    });
};

module.exports = errorHandler;

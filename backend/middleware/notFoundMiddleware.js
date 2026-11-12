// Responsible for catching requests to undefined routes and returning 404 responses.

const notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);

    res.status(404);

    next(error);
};

module.exports = notFound;

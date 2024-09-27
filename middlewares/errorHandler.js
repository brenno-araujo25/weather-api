export const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err.response) {
        return res.status(err.response.status).json({
            message: err.response.data.message || 'Error obtening weather data'
        });
    }

    res.status(500).json({
        message: 'Internal server error'
    });
};
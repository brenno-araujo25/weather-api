export const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err.response) {
        return res.status(err.response.status).json({
            message: err.response.data.message || 'Error obtaining weather data'
        });
    }

    res.status(500).json({
        message: 'Internal server error'
    });
};
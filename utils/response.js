const Response = (res, statusCode, message, data, error = []) => {
    return res.status(statusCode).json({
        message,
        data,
        error
    });
}

export default Response;
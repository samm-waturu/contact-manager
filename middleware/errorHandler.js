const {errorCodes} = require('../errorCodes')

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case errorCodes.VALIDATION_ERROR:
            res.json({
                title: "Validation failed", message: err.message
            });
            break
        case errorCodes.NOT_FOUND:
            res.json({
                title: "Not Found", message: err.message
            })
            break
        case errorCodes.FORBIDDEN:
            res.json({
                title: "Forbidden", message: err.message
            })
            break
        case errorCodes.UNAUTHORIZED:
            res.json({
                title: "Unauthorized", message: err.message
            })
            break
        case errorCodes.SERVER_ERROR:
            res.json({
                title: "Server error", message: err.message
            })

        default:
            console.log(`No error`)
    }

}

module.exports = errorHandler
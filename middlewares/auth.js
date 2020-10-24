const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get token form the header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        // ERROR_CODE 401 Unauthorided
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Decoding the jwt with secret key
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // settign request.user = user from decoed object
        req.user = decoded.user;
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }


}
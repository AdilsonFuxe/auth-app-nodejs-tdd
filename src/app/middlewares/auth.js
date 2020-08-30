const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (request, response, next) => {
    const authHeader = request.headers.authorization;

    if(!authHeader)
        return response.status(401).json({ message: 'Token not provided'});

    const[, token] = authHeader.split(' ');
  
    try {
        const decoded = jwt.verify(token, process.env.APP_SECRET);
        request.userId = decoded.id;
       return next();
    } catch (error) {
        return response.status(401).json({ message: 'Token invalid'});
    }
}
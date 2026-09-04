const decrypt = require('../utils/crypto');
const jwt = require('jsonwebtoken');


const AuthMiddleware = async (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'unset token!' });

    try {

        const [, token] = authHeader.split(' ');

        const payload = jwt.verify(token, process.env.TOKEN);


        req.userId = parseInt(decrypt(payload.userId));

        return next();
    } catch (error) {
        res.status(401).json({ message: 'unathorized!' });
    }






} 
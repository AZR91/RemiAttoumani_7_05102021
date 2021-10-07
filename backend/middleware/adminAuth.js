/**
 * Auth - middleware pour admin requests
 *
 */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
         // @ts-ignore
        const isAdmin = decodedToken.isAdmin;
        if (isAdmin !== true) {
            throw 'non autorisé';
        } else {
            next();
        }
    } catch {
        res.status(403).json({
            error: "Requête réservée aux admins"
        });
    }
};
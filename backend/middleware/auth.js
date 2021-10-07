/**
 * Auth - middleware:
 * Utilisé pour assurer l'authentification sur les demandes afin que seuls les utilisateurs enregistrés puissent accéder aux données
 * 
 * @jsonwebtokenest utilisé pour comparer le token porteur de la demande avec l'IDuser. Si correspondance, la demande de l'utilisateur est autorisée.
 * 
 */

const getUserIdFromToken = require("../utils/getUserId");

module.exports = (req, res, next) => {
const userId = req.body.userId;
const authorization = req.headers.authorization;

console.log(req.body.userId)

try {
    if (!authorization) throw new Error("Pas d'utilisateur enregistré");
    if (userId && userId !== getUserIdFromToken(req)) throw new Error("userId non valide");
    next();
} catch (error) {
    res.status(401).json({message: 'Utilisateur non enregistré !'});
}
};
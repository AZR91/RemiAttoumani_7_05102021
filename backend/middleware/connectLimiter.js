/**
 * accountLimiter - middleware
 * 
 * Bloque les tentatives de connexion après 5 requêtes dans la même heure. Empêche les attaques .
 * Réglages avec @express-rate-limit
 */

const rateLimit = require("express-rate-limit");

const ConnectAccountLimiter = rateLimit({
   windowMs: 60 * 60 * 1000, 
max: 5, 
message:
    "5 tentatives de connexion à partir de IP, merci de réessayer d'ici une heure",
headers: true
});

module.exports = ConnectAccountLimiter;
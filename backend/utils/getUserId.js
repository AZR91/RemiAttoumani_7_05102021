const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const getUserId = (req) => {
const token = req.headers.authorization.split(" ")[1];
const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
const userId = decodedToken.userId;

return userId;
};

module.exports = getUserId;
const jwt = require("jsonwebtoken");
require("dotenv").config();


function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const jwt_secret = process.env.jwt_secret;
    const brear = req.headers.authorization;
    const word = brear.split(" ");
    const token = word[1];
    const user = jwt.verify(token,jwt_secret);
    if(user.username){
        req.username = user.username;
        next();
    }else{
        res.status(403).json({
            msg:"invalid user"
        })
    }
}

module.exports = userMiddleware;
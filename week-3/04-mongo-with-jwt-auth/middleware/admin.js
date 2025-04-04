// Middleware for handling auth
const jwt = require("jsonwebtoken");
const {jwt_secret} = require("../config");
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const berar = req.headers.authorization;
    const word  = berar.split(" ");
    const token  = word[1];
    const admin = jwt.verify(token,jwt_secret);
    if(admin.username){
        next();
    }else{
        res.status(403).json({
            msg:"invalid token"
        })
    }

}

module.exports = adminMiddleware;
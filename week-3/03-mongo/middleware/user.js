const {User} = require("../db/index")

function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    const data = User.findOne({
        username:username,
        password:password
    })
    if(!data){
        res.json({
            msg:"invalid credential"
        })
    }else{
        next();
    }

}

module.exports = userMiddleware;
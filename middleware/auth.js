const jwt = require('jsonwebtoken');
const config = require("config");

function auth(req, res, next){
    const token = req.header("x-auth-token");
    if(!token) return res.status(401).send("Access Denied. No token provided.");

    try{
        console.log(token);
        const decoded = jwt.decode(token);
        console.log(token,'\n',decoded);
        req.user = decoded;
        next()
    }
    catch(ex) {
        res.status(ex.status).send("Invalid Token.", ex);
    }
};


module.exports = auth;
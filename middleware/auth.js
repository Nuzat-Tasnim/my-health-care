const jwt = require('jsonwebtoken');
const config = require("config");

function auth(req, res, next){
    const token = req.header("x-auth-token");
    if(!token) return res.status(401).send("Access Denied. No token provided.");

    try{
        // console.log(token);
        const cleanedToken = token.replace(/^"(.*)"$/, '$1');
        const decoded = jwt.decode(cleanedToken);
        // console.log(cleanedToken, " ", typeof cleanedToken,'\n',
        //             decoded, " ", typeof decoded);
        req.user = decoded;  // attaching the user object with req
        // console.log("decoded -->",decoded)
        next()
    }
    catch(ex) {
        res.status(ex.status).send("Invalid Token.", ex);
    }
};


module.exports = auth;
const jwt = require('jsonwebtoken');
const securityKey = require('../Configurations/jwtConfig');

function authenticateToken(){

    const authHeader =  req.headers('authorization');

    if(!authHeader){
        return res.status(401).send('Unauthorized: Missing Token');
    }

    const [bearer, token] = authHeader.split(' ');

    if(bearer !== 'Bearer'){
        return res.status(401).send('Unauthorized: Invalid Token Format');
    }

    jwt.verify(token, securityKey, (err, user) => {
        if(err){
            return res.status(403).send('Unauthorized: Invalid Token');
        }
        req.user = user;
        next();
    })

}
module.exports = {authenticateToken};
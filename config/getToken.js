const jwt = require('jsonwebtoken');

module.exports = getToken = (req, res, next) => {
    
    // Get auth header
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){
        bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}
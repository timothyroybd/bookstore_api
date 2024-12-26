const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    const authHeader = req.header('Authorization')
    if(!authHeader){
        console.log('Authorization header missing')
        return res.status(401).json({msg: 'No token, authorization denied'})
    }
    const token = authHeader.split(' ')[1]
    if(!token){
        console.log('Token missing in Authorization header');
        return res.status(401).json({msg: 'No token, authorization denied'})
    }

    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log('Decoded token:', decoded); // Debugging line
        req.user = {id: decoded.id}
        next()
    }catch(err){
        console.log('Token verification failed:', err.message);
        res.status(401).json({msg: 'Token is not valid'})
    }
}
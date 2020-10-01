let jwt = require('jsonwebtoken');
let ValidationError = require('../utils/errors')

async function isAuth(req, res, next){
    let token = req.get('Authorization').split(' ')[1];
    let decoded_token;

    try {
        decoded_token = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded_token){
            let err = new ValidationError('invalid token for verification, Not Authenticated', 500);
            throw err
        }

        req.userId = token.id;
        next()

    } catch (error) {
        next(error)
    }
}
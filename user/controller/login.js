const User = require('../model/user');
const bcrypt = require('bcrypt');
const ValidationError = require('../utils/errors');
const jwt = require('jsonwebtoken')


async function login(req, res, next) {
    const { email, password } = req.body;
    let err;

    const user_exist = await User.findOne({ email: email });
    try {
        if (!user_exist) {
            err = new ValidationError('this is not a registered user', 404);
            throw err
        }

        const compare_password = await bcrypt.compare(password, user_exist.password);
        if (!compare_password) {
            err = new ValidationError('password does not match', 422)
            throw err
        }


        const login_token =  jwt.sign({ id: user_exist._id, email: user_exist.email }, process.env.SECRET_KEY , {expiresIn : '2h'});

        res.status(201).json({
            token: login_token,
            user: {
                email: user_exist.email,
                id: user_exist._id,
                contact: user_exist.contact,
                address: user_exist.address
            }
        })

        return req.userId = user_exist._id
    } catch (error) {
        next(err)
    }



}

module.exports = login
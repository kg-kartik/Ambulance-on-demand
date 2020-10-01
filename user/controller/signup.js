const User = require("../model/user");
const { validationResult } = require('express-validator')
const ValidationError = require("../utils/errors");
const bcrypt = require('bcrypt')



async function Signup(req, res, next) {
    const { name, email, contact, address, password } = req.body
    const body_error = validationResult(req)
    let err;
    try {
        if (!body_error.isEmpty()) {
            err = new ValidationError('this is not a valid email', 400)
            throw err
        }
    } catch (error) {
        next(error)
    }

    let User_exist;

    try {
        User_exist = await User.findOne({ email: email })
        if (User_exist) {
            let err = new ValidationError('this username is taken', 422)
            throw err
        }

        const hashed_password = await bcrypt.hash(password, 14)
        const new_user = await new User({
            name: name,
            email: email,
            contact: contact,
            address: address,
            password: hashed_password
        })

        await new_user.save();

        return res.status(201).json({
            message: 'user has been successfully created',
            id: new_user._id
        })

    } catch (error) {
        next(error)
    }


}

module.exports = Signup
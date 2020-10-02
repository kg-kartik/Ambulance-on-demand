
const signup = require('../controller/signup');
const router = require('express').Router();
const { body } = require('express-validator')

const signup_validation = [
    body('email')
        .isEmail()
        .trim(),
]

router.post('/api/ambulance/auth/signup', signup_validation, signup);

module.exports = router
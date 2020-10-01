const login = require('../controller/login');
const router = require('express').Router();

router.post('/api/ambulance/auth/login', login);

module.exports = router
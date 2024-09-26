const express = require('express');
const userRegister = require('../controllers/UserRegister');
const VerifyEmail = require('../controllers/VerifyEmail');
const router = express.Router(); //create router

//create user api
router.post('/register',userRegister);
//verify user email
router.post('/email',VerifyEmail);
module.exports = router;
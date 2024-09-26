const express = require('express');
const userRegister = require('../controllers/UserRegister');
const VerifyEmail = require('../controllers/VerifyEmail');
const verifyPassword = require('../controllers/verifyPassword');
const router = express.Router(); //create router

//create user api
router.post('/register',userRegister);
//verify user email
router.post('/email',VerifyEmail);
//verify user password
router.post('/password',verifyPassword);
module.exports = router;
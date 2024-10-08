const express = require('express');
const userRegister = require('../controllers/UserRegister');
const VerifyEmail = require('../controllers/VerifyEmail');
const verifyPassword = require('../controllers/verifyPassword');
const UserDetails = require('../controllers/UserDetails');
const Logout = require('../controllers/Logout');
const UpdateUserDetails = require('../controllers/UpdateUserDetails');
const router = express.Router(); //create router

//create user api
router.post('/register',userRegister);
//verify user email
router.post('/email',VerifyEmail);
//verify user password
router.post('/password',verifyPassword);
//user login details
router.get('/user-details',UserDetails);
//log-out user
router.get('/logout',Logout);
//update user info
router.post('/update',UpdateUserDetails);
module.exports = router;
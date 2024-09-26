const express = require('express');
const userRegister = require('../controllers/UserRegister');
const router = express.Router(); //create router

//create user api
 
router.post('/register',userRegister);

module.exports = router;
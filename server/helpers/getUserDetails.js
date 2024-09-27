const jwt = require('jsonwebtoken');
const userModel = require('../models/UserModel');
module.exports=async function getUserDetailsFromToken(token){
    if (!token) {
        return {
            message : "session out",
            logout : true,
            errror:true
        }
    }
     //decode the code find user data
     const decode =  jwt.verify(token,process.env.JWT_SECREAT_KEY); //Synchronously verify given token using a secret or a public key to get a decoded token
     const user = await userModel.findById(decode.id).select('-password');//select used to exclude password filed
     return user;
}
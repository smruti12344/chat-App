const userModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = async function verifyPassword(req,res){
    try {
        const {password,userId} = req.body;

        //find user by userId
        const user = await userModel.findById(userId);
        
        //verify user password
        const verifyPassword = bcryptjs.compare(password, user.password); // compare method used to user enter password with user password
        if(!verifyPassword) {
            return res.status(400).json({
                message:"invalid password",
                error:true
            })
        } 
        //send link to user for sign-in
        const tokenData = { //user data
            id : user._id,
            email : user.email
        }
        const token = await jwt.sign(tokenData,process.env.JWT_SECREAT_KEY);
        const cookieOption = {
            http : true,
            secure : true
        }
        return res.cookie('token',token,cookieOption).status(200).json({
            message:"login successfully",
            token:token,
            success:true
          })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}
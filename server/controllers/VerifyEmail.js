const userModel = require('../models/UserModel');
module.exports = async function verifyEmail(req,res){
try {
    const {email} = req.body;
    const verifyEmail = await userModel.findOne({email}).select("-password");//is a Mongoose method that allows you to include or exclude specific fields in the result.("-" exclude and "+" include)

    if(!verifyEmail){
        return res.status(400).json({
            message:"user not found",
            error:true
        })
    }
    return res.status(200).json({
        message:"Email verify",
        success:true,
        data:verifyEmail
    })
} catch (error) {
    return res.status(500).json({
        message : error.message || error,
        error:true
    })
}
}
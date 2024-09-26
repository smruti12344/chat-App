const userModel = require("../models/UserModel");
const bcrypt = require('bcryptjs');
module.exports = async function register(req,res){
    try {
        const {name,email,password,profile_pic} = req.body;

        //check user is exist or not
        const verifyEmail = await userModel.findOne({email}); //if not find return null else return data

        if(verifyEmail){
             return res.status(400).json({
                message: "User already exist",
                error:true
             })
        }
        // password to hashpassword
        const salt = await bcrypt.genSalt(10); //A salt is a random string of characters added to the password before it’s hashed. This makes every password hash unique, even if two users have the same password.
        const hashpassword = await bcrypt.hash(password, salt); //function combines the salt with the password and runs it through the bcrypt hashing algorithm to create a secure, hashed version of the password.
       
        const payload = { // creating object with user data
            name,
            email,
            profile_pic,
            password : hashpassword // This is a hashed password
        }

        const user = new userModel(payload); // This line creates a new instance of the userModel based on the payload object.
        const userSave = await user.save(); // method is provided by Mongoose to persist the document (user) into the MongoDB database
        return res.status(201).json({
            message:"User register successfully",
            data : userSave,
            success : true

        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}
module.exports = async function logout(req,res){
    try {
       // Clear the authentication cookie (assuming the cookie name is 'token')
       res.clearCookie('token', {
        httpOnly: true,   // Same options as when the cookie was set
        secure: true,     // Only applies if using HTTPS
        sameSite: 'strict', // Prevents CSRF attacks
        path: '/'         // Ensure path matches where the cookie was set
    });
        return res.status(200).json({
            message : "Session out",
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }
}
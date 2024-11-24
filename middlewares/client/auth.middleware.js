
const User=require("../../models/user-model");

module.exports.requireAuth=async(req,res,next)=>{

    // Check if token is existing on page 
    if(!req.cookies.tokenUser){
        // Redirect to login page when token is not present
        res.redirect(`/user/login`);
        return;
    }else{
        // Check if token exists in database it is avoiding when we change token in page at the time when we in dashboard page
        
        // Fetch user from database by token
        const user=await User.findOne({
            tokenUser:req.cookies.tokenUser
        }).select("-password");

        // If user not found then redirect to login page
        if(!user){
            res.redirect(`/user/login`);
        }else{
            // If user found then next
            res.locals.user = user;
            next();
        }

    }
}
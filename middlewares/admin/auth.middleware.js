const systemConfig = require("../../config/system");
const Account=require("../../models/account-model");
const Role = require("../../models/role-model");

module.exports.requireAuth=async(req,res,next)=>{

    // Check if token is existing on page 
    if(!req.cookies.token){
        // Redirect to login page when token is not present
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        return;
    }else{
        // Check if token exists in database it is avoiding when we change token in page at the time when we in dashboard page
        
        // Fetch user from database by token
        const user=await Account.findOne({
            token:req.cookies.token
        }).select("-password");

        // If user not found then redirect to login page
        if(!user){
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        }else{

            const role=await Role.findOne({
                _id:user.role_id
            }).select("title Permission_groups");
            // If user found then next

            res.locals.user = user;
            res.locals.role = role;

            next();
        }

    }
}
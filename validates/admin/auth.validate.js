module.exports.loginPost=(req, res, next)=>{
    if(!req.body.email){
        req.flash("error","Email is required!");
        res.redirect(req.get("Referrer") || "/");
        return;
    }

    if(!req.body.password){
        req.flash("error","Password is required!");
        res.redirect(req.get("Referrer") || "/");
        return;
    }
    next();
}
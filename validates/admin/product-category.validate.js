module.exports.createCategoryPOST=(req,res,next)=>{

    // Check if the title is empty
    if(!req.body.title){
        req.flash("error","Title is required!");
        res.redirect(req.get("Referrer") || "/");
        return;
    }
    

    // Check the title must contain at least eight characters
    if(req.body.title.length<8){
        req.flash("error","Title is required almost eight characters !"); 
        res.redirect(req.get("Referrer") || "/");
        return;
    }

    //Check if the the length of the title exceeds the maximum length
    const MAX_TITLE_LENGTH =100;
    if(req.body.title.length>MAX_TITLE_LENGTH){
        req.flash("error","Title is too long! Maximum length is "+MAX_TITLE_LENGTH+" characters.");
        res.redirect(req.get("Referrer") || "/");
        return;
    }

    // Check if the title contains invalid characters
    const invalidCharRegex = /[<>]/;
    if(invalidCharRegex.test(req.body.title)){
        req.flash("error","Title contains invalid characters!");
        res.redirect(req.get("Referrer") || "/");
        return;
    }

    // Check for SQL injection
    const sqlInjectionRegex=/['"\\;]/;
    if(sqlInjectionRegex.test(req.body.title)){
        req.flash("error","Title contains SQL injection characters!");
        res.redirect(req.get("Referrer") || "/");
        return;
    }

    next();
}
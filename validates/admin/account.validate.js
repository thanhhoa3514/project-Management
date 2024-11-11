module.exports.createAccountPOST=(req,res,next)=>{

    if (!req.body.fullName) {
        req.flash("Full name is required");
      } else {
        const trimmedFullName = req.body.fullName.trim();
        if (trimmedFullName.length < 8) {
          req.flash("Full name must be at least 8 characters long");
        } else if (trimmedFullName.length > 100) {
          req.flash("Full name cannot exceed 100 characters");
        }
    }

    if(!req.body.email){
        req.flash("error","Email is required!");
        res.redirect(req.get("Referrer") || "/");
        return;
    }
    

    //Check if the phoneNumber contains special characters
    if(req.body.phone.length<10 && req.body.phone.length>10){
        req.flash("error","Phone number is invalid! It should contain exactly 10 digits.");
        res.redirect(req.get("Referrer") || "/");
        return;
    }


    //Check if the phoneNumber contains only numbers
    // const specialCharRegex=/[^a-zA-Z]/;
    // if(specialCharRegex.test(req.body.phone)){
    //     req.flash("error","Title contains special characters!");
    //     res.redirect(req.get("Referrer") || "/");
    //     return;
    // }

    // // Check if the title contains invalid characters
    // const invalidCharRegex = /[<>]/;
    // if(invalidCharRegex.test(req.body.title)){
    //     req.flash("error","Title contains invalid characters!");
    //     res.redirect(req.get("Referrer") || "/");
    //     return;
    // }

    // // Check for SQL injection
    // const sqlInjectionRegex=/['"\\;]/;
    // if(sqlInjectionRegex.test(req.body.title)){
    //     req.flash("error","Title contains SQL injection characters!");
    //     res.redirect(req.get("Referrer") || "/");
    //     return;
    // }


    next();
}

module.exports.createAccountPATCH=(req,res,next)=>{

    if (!req.body.fullName) {
        req.flash("Full name is required");
      } else {
        const trimmedFullName = req.body.fullName.trim();
        if (trimmedFullName.length < 8) {
          req.flash("Full name must be at least 8 characters long");
        } else if (trimmedFullName.length > 100) {
          req.flash("Full name cannot exceed 100 characters");
        }
    }

    if(!req.body.email){
        req.flash("error","Email is required!");
        res.redirect(req.get("Referrer") || "/");
        return;
    }
    

    //Check if the phoneNumber contains special characters
    if(req.body.phone.length<10 && req.body.phone.length>10){
        req.flash("error","Phone number is invalid! It should contain exactly 10 digits.");
        res.redirect(req.get("Referrer") || "/");
        return;
    }
    next();
}
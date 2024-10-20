module.exports.createProductPOST=(req,res,next)=>{

    // Check if the title is empty
    if(!req.body.title){
        req.flash("error","Title is required!");
        res.redirect(req.get("Referrer") || "/");
        return;
    }
    
    // Trim the space of the front and the end product
    req.body.title=req.body.title.trim();

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

    //Check if the title contains special characters
    // const specialCharRegex=/[^a-zA-Z0-9]/;
    // if(specialCharRegex.test(req.body.title)){
    //     req.flash("error","Title contains special characters!");
    //     res.redirect(req.get("Referrer") || "/");
    //     return;
    // }

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

    // Check if the price is a valid number
    if (req.body.price === "") {
        req.flash("error", "Product price is empty, please enter the price of the product!");
        res.redirect(req.get("Referrer") || "/");
        return;
    }
    req.body.price = req.body.price.trim();

    if (isNaN(req.body.price)) {
        req.flash("error", "Product price must be a valid number!");
        res.redirect(req.get("Referrer") || "/");
        return;
    }

    // Check if price is a positive number
    if (parseFloat(req.body.price) <= 0) {
        req.flash("error", "Product price must be a positive number!");
        res.redirect(req.get("Referrer") || "/");
        return;
    }
    // Check if price has a valid format
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(req.body.price)) {
        req.flash("error", "Product price must be a valid number with up to two decimal places!");
        res.redirect(req.get("Referrer") || "/");
        return;
    }


    // Check discountPercent
    if (req.body.discountPercentage){
        if (isNaN(req.body.discountPercentage)) {
            req.flash("error", "Discount percentage must be a valid number!");
            res.redirect(req.get("Referrer") || "/");
            return;
        }

        if (req.body.discountPercentage < 0) {
            req.flash("error", "Discount percentage must be between 0 and 100!");
            res.redirect(req.get("Referrer") || "/");
            return;
        }

        if (req.body.discountPercentage > 100) {
            req.flash("error", "Discount percentage must be between 0 and 100!");
            res.redirect(req.get("Referrer") || "/");
            return;
        }
    }
    next();
}
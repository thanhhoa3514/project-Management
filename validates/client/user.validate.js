module.exports.registerPost = (req, res, next) => {
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

  if (!req.body.email) {
    req.flash("error", "Email is required!");
    res.redirect(req.get("Referrer") || "/");
    return;
  }

  if (!req.body.password) {
    req.flash("danger", "Password is required!");
    res.redirect(req.get("Referrer") || "/");
    return;
  }

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
};

module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Email is required!");
    res.redirect(req.get("Referrer") || "/");
    return;
  }

  if (!req.body.password) {
    req.flash("danger", "Password is required!");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  next();
};


module.exports.forgotPasswordPost= (req, res,next) => {
  if (!req.body.email) {
    req.flash("error", "Email is required!");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  next();
};


module.exports.resetPasswordPost= (req, res,next) => {
  if (!req.body.password) {
    req.flash("error", "Password is required!");
    res.redirect(req.get("Referrer") || "/");
    return;
  }

  if (!req.body.confirmPassword) {
    req.flash("error", "Please enter to confirm password!");
    res.redirect(req.get("Referrer") || "/");
    return;
  }

  if (req.body.password!== req.body.confirmPassword) {
    req.flash("error", "Passwords do not match!");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  next();
};
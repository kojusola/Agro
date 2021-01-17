exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            req.flash("error", "Unauthorised!")
            return res.redirect('/auth/login')
        }
        next()
    }
}

exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    req.flash("error", "Please login")
    res.redirect('/auth/login')
    
}
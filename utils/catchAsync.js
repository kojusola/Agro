module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            req.flash('error', "Something went wrong. Please try again")
            res.redirect("back")
        })
    }
}
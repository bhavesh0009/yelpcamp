module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error_msg', 'Please login to view this resource');
        return res.redirect('/login');
    }
    next()
}
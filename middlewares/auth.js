// auth.js

const requireAuth = (req, res, next) => {

    if (!req.session.user) {
        
        return res.redirect('/users/login');
}
    next();
};

export { requireAuth };

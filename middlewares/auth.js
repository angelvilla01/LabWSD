// auth.js

const requireAuth = (req, res, next) => {

    if (!req.session.user) {
        req.session.errorMessage = 'You need to be logged in to access this page.';
        return res.redirect('/users/login');
    }
    next();
};

export { requireAuth };

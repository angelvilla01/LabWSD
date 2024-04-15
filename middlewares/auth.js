const requireAuth = (req, res, next) => {

    console.log(req.session.user.username)
    if (req.username === 'admin') {
        console.log('Admin detected');
    }

    if (!req.session.user) {
        res.send('<script>alert("No active session, log int to continue..."); window.location.href = "/users/login";</script>');
    } else {
        next();
    }
};

export { requireAuth };

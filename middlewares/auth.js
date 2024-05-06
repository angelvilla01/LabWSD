const requireAuth = (req, res, next) => {


    if (!req.session.user) {
        res.send('<script>alert("No active session, log int to continue..."); window.location.href = "/users/login";</script>');
    } else {
        next();
    }
};

export { requireAuth };

const requireAdminAuth = (req, res, next) => {
    if (!req.session.user || req.session.user.username !== "admin") {
        res.status(403).send('<script>alert("You are not authorized to access this page..."); window.location.href = "/users/login";</script>');
    } else {
        next();
    }
}

export { requireAdminAuth };

const backHomeAdmin = (req, res, next) => {
    if (req.session.user.username === "admin") {
        res.render('user-management');
    } else {
        next();
    }
}

export { backHomeAdmin };

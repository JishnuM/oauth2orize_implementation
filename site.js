var passport = require('passport'),
    login = require('connect-ensure-login'),
    db = require('./db');

exports.index = function(req, res){
    res.send('Oauth Server');
}

exports.loginForm = function(req, res){
    res.render('login');
}

exports.login = passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
});

exports.logout = function(req, res){
    req.logout();
    res.redirect('/');
}

exports.account = [
    login.ensureLoggedIn(),
    function(req, res){
        res.render('account', { user: req.user });
    }
]

exports.appdetails = [
    login.ensureLoggedIn(),
    function(req, res){
        db.clients.findByUserId(req.user.Id, function(err, apps){
            res.render('appdetails', { apps: apps });
        });       
    }
]

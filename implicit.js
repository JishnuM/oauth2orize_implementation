var passport = require('passport'),
    login = require('connect-ensure-login');

exports.loginForm = function(req, res){
    res.render('loginImplicit', {
        clientId: req.query.clientId,
        redirectUri: req.query.redirectUri
    });
}

exports.login = [
    passport.authenticate('local', { failureRedirect: '/loginImplicit', failureFlash: true}),
    function(req, res){
        console.log('Success');
        res.redirect('/dialog/authorize?response_type=token' +
        '&client_id=' + req.body.clientId +
        '&redirect_uri=' + req.body.redirectUri);
    }
]

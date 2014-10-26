var passport = require('passport'),
    login = require('connect-ensure-login');

exports.loginForm = function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/account');
    } else {
        res.render('loginImplicit', {
            clientId: req.query.clientId,
            redirectUri: req.query.redirectUri
        });
    }
}

exports.login = function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        console.log(user);
        if (err) { throw err;}
        if (!user){
            res.redirect('/loginImplicit?clientId=' + 
                req.body.clientId + '&redirectUri' +
                req.body.redirectUri);
        }
        req.logIn(user, function(err) {
            if (err) { throw err;}
            return res.redirect('/dialog/authorize?response_type=token' +
                '&client_id=' + req.body.clientId +
                '&redirect_uri=' + req.body.redirectUri);
        });
    })(req, res, next);
}

exports.autologin = function(req, res, next){
    if(req.isAuthenticated()){ 
        res.redirect('/dialog/authorize?response_type=token' +
        '&client_id=' + req.query.clientId +
        '&redirect_uri=' + req.query.redirectUri);
    } else {
        passport.authenticate('local', function(err, user, info){
            if (err) { throw err;}
            if (!user) {
                return res.redirect('/loginImplicit?clientId=' + 
                    req.query.clientId + '&redirectUri=' + req.query.redirectUri);
            }
            req.logIn(user, function(err) {
                if (err) { throw err;}
                return res.redirect('/dialog/authorize?response_type=token' +
                    '&client_id=' + req.query.clientId +
                    '&redirect_uri=' + req.query.redirectUri);
            });
        })(req, res, next);
    }

}

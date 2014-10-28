var passport = require('passport'),
    db = require('./db');

exports.userinfo = function(req, res, next){
    passport.authenticate('bearer', {session: false},
        function(err, user, scope){
            if(err) { return res.status(404).json({status: 'error'}); }
            if (!user) { return res.status(400).json({status: 'error'}); }
            else if (scope.indexOf('info-read') === -1){
                return res.status(401).json({status: 'unauthorized'});
            } else {
                return res.json({status: 'ok', info: user.info});
            }
        }
    )(req, res, next);
}


exports.editinfo = function(req, res, next){
    passport.authenticate('bearer', {session: false},
        function(err, user, scope){
            if(err) { return res.status(404).json({status: 'error'}); }
            if (!user) { return res.status(400).json({status: 'error'}); }
            else if (scope.indexOf('info-write') === -1){
                return res.status(401).json({status: 'unauthorized'});
            } else {
                db.users.updateInfoById(user.userId, req.body, function(err, user){
                    if(!user) {
                        res.status(400).json({status: 'error'});
                    } else {
                        res.status(200).json({status: 'ok', info: user.info});
                    }
                });
            }
        }
    )(req, res, next);
} 

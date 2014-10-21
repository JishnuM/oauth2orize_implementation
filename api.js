var passport = require('passport'),
    db = require('./db');

//TODO Check validity of token versus endpoint

exports.userinfo = [
    passport.authenticate('bearer', { session: false }),
    db.users.findByUserId(req.user.id, function(err, user){
        if(!user) { 
            res.status(400).json({status: 'error'});
        } else {
            res.json({
                status: 'ok',
                info: user.info
            });
        }
    })
]

exports.editinfo = [
    passport.authenticate('bearer', {session: false}),
    db.users.updateInfoById(req.user.id, req.body.info, function(err, user){
        if(!user) {
            res.status(400).json({status: 'error'});
        } else {
            res.status(200).json({status: 'ok'});
        }
    })
]        

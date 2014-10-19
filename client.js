var passport = require('passport');

exports.info = [
    passport.authenticate('bearer', { session: false }),
    function(req, res){
        res.json({
            client_id: req.user.id,
            name: req.user.name,
            scope: req.authInfo.scope
        })
    }
]

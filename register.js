var db = require('./db'),
    utils = require('./utils'),
    login = require('connect-ensure-login');

exports.registerFormUser = function(req, res){
    res.render('userRegistration');
}

exports.registerUser = function(req, res){
    
    //TODO Validate username and password
    //Check minimum length

    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var userId = utils.uid(12);

    db.users.findByUsername(username, function(err, user){
        if(user){
            res.send("Username is already taken", 422);
        } else {
            db.users.save(username, password, name, userId, 
                function(err, user){
                    res.status(201).send({
                        username: user.username,
                        name: user.name
                    }); //Check this
                }
            );
        }
    });
}

exports.registerFormClient = [
    login.ensureLoggedIn(),
    function(req, res){
        res.render('clientRegistration');
    }
]

exports.registerClient = [
    login.ensureLoggedIn(),
    function(req, res) {
        //TODO Validate name
        var name = req.body.name;
        var domain = req.body.domain;
        var clientId = utils.uid(12);
        var clientSecret = utils.uid(20);
   
        db.clients.findByClientName(name, function(err, client){
            if(client){
                res.send("Username is already taken", 422);
            } else {
                db.clients.save(name, clientId, clientSecret, domain, req.user.userId, 
                    function(err, client){
                        res.status(201).send({
                            clientId: client.clientId,
                            clientSecret: client.clientSecret
                        });
                    }
                );
            }
        });
    }
]

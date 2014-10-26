var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userId: String,
    name: String,
    username: String,
    password: String,
    info: mongoose.Schema.Types.Mixed
});

var User = mongoose.model('User', UserSchema);

exports.findByUserId = function(id, done){
    User.findOne({userId: id}).lean().exec(done);
}

exports.findByUsername = function(username, done){
    User.findOne({username: username}).lean().exec(done);
}

exports.save = function(username, password, name, userId, done){
    var user = new User({
        username: username, 
        password: password,
        name: name,
        userId: userId,
        info: {}
    });
    user.save(done);
}

exports.updateInfoById = function(id, newInfo, done){
    User.findOne({userId: id}, function(err, doc){
        if(err) { done(err); }
        doc.info = newInfo;
        doc.save(done);
    });
}

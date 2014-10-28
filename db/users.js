var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    userId: String,
    name: String,
    username: String,
    info: mongoose.Schema.Types.Mixed
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);

exports.findByUserId = function(id, done){
    User.findOne({userId: id}).lean().exec(done);
}

exports.findByUsername = function(username, done){
    User.findOne({username: username}).lean().exec(done);
}

exports.save = function(username, password, name, userId, done){
    User.register(
        new User({username: username, name:name, userId: userId}),
        password, 
        done
    );
}

exports.updateInfoById = function(id, newInfo, done){
    User.findOne({userId: id}, function(err, doc){
        if(err) { done(err); }
        console.log(newInfo);
        doc.info = newInfo;
        doc.markModified('info');
        doc.save(done);
    });
}

exports.authenticate = User.authenticate();

exports.serializeUser = User.serializeUser();

exports.deserializeUser = User.deserializeUser();

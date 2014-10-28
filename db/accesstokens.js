var mongoose = require('mongoose');

var TokenSchema = new mongoose.Schema({
    userId: String,
    clientId: String,
    key: String,
    scope: [String],
    created: { type: Date, default: Date.now }
});

var Token = mongoose.model('Token', TokenSchema);

exports.find = function(key, done){
    Token.findOne({key: key}).lean().exec(done);
}

exports.save = function(key, userId, clientId, scope, done){
    var token = new Token({
        key: key,
        userId: userId,
        clientId: clientId,
        scope: scope
    });
    token.save(done);
}

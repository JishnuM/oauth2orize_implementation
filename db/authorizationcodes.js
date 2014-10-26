var mongoose = require('mongoose');

var CodeSchema = new mongoose.Schema({
    userId: String,
    clientId: String,
    redirectUri: String,
    key: String
});

var Code = mongoose.model('Code',CodeSchema);

exports.find = function(key, done){
    Code.findOne({code: code}).lean().exec(done);
}

exports.save = function(key, clientId, redirectUri, userId, done){
    var code = new Code({
        key: key,
        userId: userId,
        clientId: clientId,
        redirectUri: redirectUri
    });
    code.save(done);
}

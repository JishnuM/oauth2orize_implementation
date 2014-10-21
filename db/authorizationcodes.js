/*var codes = {};


exports.find = function(key, done) {
  var code = codes[key];
  return done(null, code);
};

exports.save = function(code, clientID, redirectURI, userID, done) {
  codes[code] = { clientID: clientID, redirectURI: redirectURI, userID: userID };
  return done(null);
};*/

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

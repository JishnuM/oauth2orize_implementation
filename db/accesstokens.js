/*var tokens = {};


exports.find = function(key, done) {
  var token = tokens[key];
  return done(null, token);
};

exports.save = function(token, userID, clientID, done) {
  tokens[token] = { userID: userID, clientID: clientID };
  return done(null);
};*/

var mongoose = require('mongoose');

var TokenSchema = new mongoose.Schema({
    userId: String,
    clientId: String,
    key: String
});

var Token = mongoose.model('Token', TokenSchema);

exports.find = function(key, done){
    Token.findOne({key: key}).lean().exec(done);
}

exports.save = function(key, userId, clientId, done){
    var token = new Token({key:key, userId: userId, clientId:clientId});
    token.save(done);
}

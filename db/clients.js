/*var clients = [
    { id: '1', name: 'Samplr', clientId: 'abc123', clientSecret: 'ssh-secret' },
    { id: '2', name: 'Samplr2', clientId: 'xyz123', clientSecret: 'ssh-password' }
];


exports.find = function(id, done) {
  for (var i = 0, len = clients.length; i < len; i++) {
    var client = clients[i];
    if (client.id === id) {
      return done(null, client);
    }
  }
  return done(null, null);
};

exports.findByClientId = function(clientId, done) {
  for (var i = 0, len = clients.length; i < len; i++) {
    var client = clients[i];
    if (client.clientId === clientId) {
      return done(null, client);
    }
  }
  return done(null, null);
};*/

var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    name: String,
    clientId: String,
    clientSecret: String
});

var Client = mongoose.model('Client', ClientSchema);


exports.findByClientId = function(clientId, done){
    Client.findOne({clientId: clientId}).lean().exec(done);
}

exports.findByClientName = function(name, done){
    Client.findOne({name: name},done);
}

exports.save = function(name, clientId, clientSecret, done){
    var client = new Client({
        name: name, 
        clientId: clientId,
        clientSecret: clientSecret
    });
    client.save(done);
}


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


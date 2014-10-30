var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    name: String,
    clientId: String,
    clientSecret: String,
    domain: String,
    userId: String
});

var Client = mongoose.model('Client', ClientSchema);


exports.findByClientId = function(clientId, done){
    Client.findOne({clientId: clientId}).lean().exec(done);
}

exports.findByClientName = function(name, done){
    Client.findOne({name: name},done);
}

exports.findByUserId = function(userId, done){
    Client.find({userId: userId}).lean().exec(done);
}

exports.save = function(name, clientId, clientSecret, domain, userId, done){
    var client = new Client({
        name: name, 
        clientId: clientId,
        clientSecret: clientSecret,
        domain: domain,
        userId: userId
    });
    client.save(done);
}


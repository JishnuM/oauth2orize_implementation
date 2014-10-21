var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/humer');

exports.users = require('./users');
exports.clients = require('./clients');
exports.accessTokens = require('./accesstokens');
exports.authorizationCodes = require('./authorizationcodes');

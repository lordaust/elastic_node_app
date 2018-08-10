var client = require('./connection.js');
const http = require('http').request();
var ip = http.request.header('x-forwarded-for') || req.connection.remoteAddress;

console.log("-- Client IP address --",ip);


client.cluster.health({},function(err,resp,status) {
  console.log("-- Client Health --",resp);
});

client.count({index: 'player',type: 'comment'},function(err,resp,status) {
  console.log("constituencies",resp);
});

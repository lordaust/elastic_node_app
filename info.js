var client = require('./connection.js');

client.cluster.health({},function(err,resp,status) {
  console.log("-- Client Health --",resp);
});

client.count({index: 'player',type: 'comment'},function(err,resp,status) {  
  console.log("constituencies",resp);
});

var client = require('./connection.js');

client.indices.create({
  index: 'player'
},function(err,resp,status) {
  if(err) {
    console.log(err);
  }
  else {
    console.log("create",resp);
  }
});

var client = require('./connection.js');

client.indices.delete({index: 'player'},function(err,resp,status) {
  console.log("delete",resp);
});

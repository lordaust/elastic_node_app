var client = require('./connection.js');

client.delete({
  index: 'player',
  id: '1',
  type: 'comment'
},function(err,resp,status) {
    console.log(resp);
});

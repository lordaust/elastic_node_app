var client = require('./connection.js');

client.index({
  index: 'player',
  id: '1',
  type: 'comment',
  body: {
    "managerid": 1,
    "managername": "Alex Andersen",
    "clubid": 13,
    "clubname": "Brummington United",
    "title": "Awesome purchase!",
    "message": "Congrats Lordaust on buying Barker. He is such a skilled player",
    "playerid": 74499,
    "playername": "Peacemaker Barker"
  }
},function(err,resp,status) {
    console.log(resp);
});

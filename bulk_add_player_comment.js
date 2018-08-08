var client = require('./connection.js');
var inputfile = require("./player_comments_small.json");
var bulk = [];

var makebulk = function(playercommentlist,callback){
  for (var current in playercommentlist){
    bulk.push(
      { index: {_index: 'player', _type: 'comment', _id: playercommentlist[current].PANO } },
      {
        'date': Date.now(),
        'managerid': playercommentlist[current].managerid,
        'managername': playercommentlist[current].managername,
        'clubid': playercommentlist[current].clubid,
        'clubname': playercommentlist[current].clubname,
        'title': playercommentlist[current].title,
        'message': playercommentlist[current].message,
        'playerid': playercommentlist[current].playerid,
        'playername': playercommentlist[current].playername
      }
    );
  }
  callback(bulk);
}

var indexall = function(madebulk,callback) {
  client.bulk({
    maxRetries: 5,
    index: 'player',
    type: 'comment',
    body: madebulk
  },function(err,resp,status) {
      if (err) {
        console.log(JSON.stringify(err));
      }
      else {
        callback(resp.items);
      }
  })
}

makebulk(inputfile,function(response){
  console.log("Bulk content prepared");
  indexall(response,function(response){
    console.log(JSON.stringify(response));
  })
});

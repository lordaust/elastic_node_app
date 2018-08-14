var express = require('express');
var router = express.Router();
var client = require('../config/elasticsearch_config.js');


/* GET home page. */
router.get('/', function(req, res, next) {

const ip2 = 12;
// (req.headers['x-forwarded-for'] ||
//  req.connection.remoteAddress ||
//  req.socket.remoteAddress ||
//  req.connection.socket.remoteAddress).split(",")[0];
 console.log(ip2);

// Add view to elasticsearch
function getIP(){
    let ip = ip2.toString();
    // (req.headers['x-forwarded-for'] ||
    //  req.connection.remoteAddress ||
    //  req.socket.remoteAddress ||
    //  req.connection.socket.remoteAddress).split(",")[0];
     return ip;
     }

  const body = {
    "date": Date.now(),
    "ip": getIP(),
    "visitor_id": 17,
    "visitor_name": "No Andersen",
    "url": req.originalUrl,
  }

addView = new Promise((resolve, reject) =>{
   // Add view document to elasticsearch
    client.index({
      index: 'view',
      type: 'visits',
      body: body
    },function(err,resp,status) {
      if(err){
        console.log("The adding of a new view didnt work");
      }
      else {
        console.log("Adding of new view worked");
        resolve(1);
      }
    //console.log("Add Visitor response:");
    //console.log(resp);
  });
});
   // Get views from elasticsearch
  var page_views;

getViews = new Promise((resolve, reject) => {
  page_views = client.search({
    index: 'view',
    type: 'visits',
    size: 150,
    body: {
      query: {
        match: { "visitor_id": "17"}
      }
    }
  }, function(error, response,status){
    if(error){
      console.log("Search error:" +error);
    }
    else {
      page_views = response.hits.hits;
      resolve(page_views);
    }
  });
})



function printResultPageViews(){
  console.log(page_views);
}


function renderPage(){
  res.render('visitor', { title: 'This is the visitor page',page_views});
}

function main(){
    Promise.all([addView,getViews]).then(renderPage);
}


  main();
});

module.exports = router;

  //
  //     ,function (error, response,status) {
  //         if (error){
  //           console.log("search error: "+error);
  //         }
  //         else {
  //           console.log("--- Response ---");
  //           //console.log(response);
  //           console.log("--- Hits ---");
  //           page_views_data2 = response.hits.hits;
  //           response.hits.hits.forEach(function(hit){
  //             console.log(hit);
  //           });
  //         }
  //     }
  //   );
  // }

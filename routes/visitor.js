var express = require('express');
var router = express.Router();
var client = require('../config/elasticsearch_config.js');


/* GET home page. */
router.get('/', function(req, res, next) {

// Add view to elasticsearch
  var ip = (req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress).split(",")[0];

   // Add view document to elasticsearch
    client.index({
      index: 'view',
      type: 'visits',
      body: {
        "date": Date.now(),
        "ip": 15,
        "visitor_id": 15,
        "visitor_name": "Step Andersen",
        "url": req.originalUrl,
      }
    },function(err,resp,status) {
    //console.log("Add Visitor response:");
    //console.log(resp);
  });

   // Get views from elasticsearch
  var page_views;
  var page_views_data;
  var page_views_data2;

  async function awaitVisits(){
    page_views = await client.search(
      {
        index: 'view',
        type: 'visits',
        body: {
          query: {
            match: { "visitor_id": 12}
          }
        }
      },function (error, response,status) {
          if (error){
            console.log("search error: "+error);
          }
          else {
            console.log("--- Response ---");
            //console.log(response);
            console.log("--- Hits ---");
            page_views_data2 = response.hits.hits;
            response.hits.hits.forEach(function(hit){
              console.log(hit);
            });
          }
      }
    );
  }

    page_views_data = await JSON.stringify(page_views);
    console.log("--- Page views ---");
    console.log(page_views);
    console.log("--- Page views data ---");
    console.log(page_views_data);
    console.log("--- Page views data2 ---");
    console.log(page_views_data2);
    console.log("--- Page views data2 json stringify ---");
    console.log(JSON.stringify(page_views_data2));

    res.render('visitor', { title: 'This is the visitor page',ip,page_views,page_views_data,page_views_data2});

  awaitVisits();
});

module.exports = router;

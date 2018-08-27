var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let object = {one: 1, two: 2, three: 3}
  console.log(object);
  for(let i = 0; i>object.length; i++){
    console.log(object[i].one);
  }
  res.render('index', { title: 'This is the home page' });
});

module.exports = router;

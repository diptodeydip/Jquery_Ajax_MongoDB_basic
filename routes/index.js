var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


var url = 'mongodb://localhost:27017/'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/get_data',async function(req, res, next) {
  
    await getData(res);
  
});



router.post('/add_info', function(req, res, next) {

	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  var myobj = req.body;
  //console.log(myobj);

  dbo.collection("users").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

  res.redirect('/');
});


async function getData(res){

  var rslt = [];
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  var cursor = dbo.collection('users').find();
  cursor.forEach(function (doc,err){
    rslt.push(doc);
  },function(){ //callback function executed at last
    db.close();
    //res.render('test',{result: rslt, title: 'Express'});
    res.send(rslt);
  });
});
}



module.exports = router;

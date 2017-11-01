var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/databaseApp";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("recipes", function(err, res) {
    if (err) throw err;
    console.log("Collection recipes created!");
  });
  db.createCollection("ingredients", function(err, res) {
    if (err) throw err;
    console.log("Collection ingredients created!");
  });
  db.createCollection("portions", function(err, res) {
    if (err) throw err;
    console.log("Collection portions created!");
    db.close()
  });
});


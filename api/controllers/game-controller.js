'use strict';

const igdb = require('igdb-api-node').default;
const client = igdb('6cd5825223df67536926a01417bd70ee');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("ue3dw17s5");
  dbo.createCollection("cache", function(err, res) {
    if (err) throw err;
    console.log("Cache actif!");
    db.close();
  });
}); 

// Sytème de mise en cache fonctionnel pour la partie recherche By Id
exports.findGame = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ue3dw17s5");
    dbo.collection("cache").find({id: Number(req.params.gameId)}).toArray(function(err, mongoose) {
      if (err) throw err;
      if (mongoose.length) {
        console.log("Présent en base");
        res.json(mongoose);
      }
      else {
        console.log("Nouvel entrée");
          return client.games({
              fields: '*',
              ids: [req.params.gameId]
          }).then(igdbResponse => {
          res.send(igdbResponse.body);
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db("ue3dw17s5");
              dbo.collection("cache").insert(igdbResponse.body, {new:true}, function(err, res) {
                if (err) throw err;
                  console.log(res);
                  db.close();
              });
            });
          });
      }
      db.close();
    });
  });
};

exports.findGameByKeyWord = function(req, res) {
  return client.games({
      fields: '*',
      limit: 20,
      offset: 0,
      search: req.params.text
  }).then(igdbResponse => {
    res.send(igdbResponse.body);
  });
};

exports.clearCache = function(req, res) {
MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("GameTracker");
      dbo.collection("cache").remove({}, function(err, res) {
        if (err) throw err;
          console.log("remove ok");
          db.close();
      });
    });
  res.json("cache vidé")
};
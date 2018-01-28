'use strict';

const igdb = require('igdb-api-node').default;
const client = igdb('6cd5825223df67536926a01417bd70ee');

exports.findGame = function(req, res) {
  return client.games({
      fields: '*',
      ids: [req.params.id]
  }).then(igdbResponse => {
    res.send(igdbResponse.body[0]);
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


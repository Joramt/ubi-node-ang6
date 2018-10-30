'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _issue = require('./models/issue');

var _issue2 = _interopRequireDefault(_issue);

var _mongoDb = require('./mongoDb.js');

var _mongoDb2 = _interopRequireDefault(_mongoDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoDb2.default.connectTo('issues');

// Need to connect to a running mongo DB
// edit to use your own host / port in ./mongoDb.js


_mongoose2.default.connection.once('open', function () {
  console.log('Connected to local mongo db : ' + _mongoDb2.default.getMongoDbUrl());
});

var app = (0, _express2.default)();
var router = _express2.default.Router();
var port = 4000;

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());

router.route('/issues').get(function (req, res) {
  _issue2.default.find(function (err, issues) {
    if (err) {
      console.log(err);
    } else {
      res.json(issues);
    }
  });
});

router.route('/issues/:id').get(function (req, res) {

  _issue2.default.findById(req.params.id, function (err, issue) {
    if (err) {
      console.log(err);
    } else {
      res.json(issue);
    }
  });
});

router.route('/issues/create').post(function (req, res) {
  console.log(req.body);
  var issue = new _issue2.default(req.body);
  issue.save().then(function (issue) {
    res.status(200).json('Successfully added a new issue');
  }).catch(function (error) {
    res.status(400).send('Failed to create a new issue');
    console.log(error);
  });
});

router.route('/issues/update/:id').post(function (req, res) {
  var new_issue = new _issue2.default(req.body);
  _issue2.default.findById(req.params.id, function (err, issue) {

    if (!issue) {
      return next(new Error("Couldnt load the request issue"));
    } else {
      issue = new_issue;
      issue.save().then(function (issue) {
        res.status(200).json('Successfully updated ' + req.params.id + ' issue');
      }).catch(function (error) {
        res.status(400, 'Failed to update issue #' + req.params.id);
      });
    }
  });
});

router.route('/issues/delete/:id').delete(function (req, res) {
  _issue2.default.findByIdAndRemove(req.params.id, function (err, issue) {
    if (err) {
      console.log(error);
    } else {
      res.json('Removed Successfully');
    }
  });
});

app.use('/', router);

app.listen(port, function () {
  return console.log("Express server running on port " + port);
});
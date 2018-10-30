'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _issue = require('./models/issue');

var _issue2 = _interopRequireDefault(_issue);

var _mongoDb = require('./mongoDb.js');

var _mongoDb2 = _interopRequireDefault(_mongoDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoDb2.default.connectToCollection('issues');

// Need to connect to a running mongo DB
// edit to use your own host / port in ./mongoDb.js


_mongoose2.default.connect().once('open', function () {
  console.log('Connected to local mongo db');
});

var app = (0, _express2.default)();
var router = _express2.default.Router();
var port = 4000;
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
  _issue2.default.findBydId(req.params.id, function (err, issue) {
    if (err) {
      console.log(err);
    } else {
      res.json(issue);
    }
  });
});

router.route('/issues/add').post(function (req, res) {
  var issue = new _issue2.default(req.body);
  issue.save().then(function (issue) {
    res.status(200, 'Successfully added a new issue');
  }).catch(function (error) {
    res.status(400, 'Failed to create a new issue');
    console.log(error);
  });
});

router.route('/issues/ediit/:id').post(function (req, res) {
  var new_issue = new _issue2.default(req.body);
  _issue2.default.findBydId(req.params.id, function (err, issue) {
    if (!issue) {
      return next(new Error("Couldnt load the request issue"));
    } else {
      issue = new_issue;
      issue.save().then(function (issue) {
        res.status(200, 'Successfully updated the new issue');
      }).catch(function (error) {
        res.status(400, 'Failed to update this issue');
      });
    }
  });
});

router.route('/issues/delete/:id').get(function (req, res) {
  _issue2.default.findBydIdAndRemove({ _id: req.params.id }, function (err, issue) {
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
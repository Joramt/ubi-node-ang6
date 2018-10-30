import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import Issue from './models/issue';

// Need to connect to a running mongo DB
// edit to use your own host / port in ./mongoDb.js
import MongoDb from './mongoDb.js';
MongoDb.connectTo('issues');

mongoose.connection.once('open', () => {
 console.log('Connected to local mongo db : ' + MongoDb.getMongoDbUrl());
})

const app = express();
const router = express.Router();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

router.route('/issues').get((req, res) => {
  Issue.find((err, issues) => {
    if(err){
      console.log(err);
    } else {
      res.json(issues);
    }
  });
});

router.route('/issues/:id').get((req, res) => {

  Issue.findById(req.params.id, (err, issue) => {
    if(err){
      console.log(err);
    } else {
      res.json(issue);
    }
  });
});

router.route('/issues/create').post((req, res) => {
  console.log(req.body);
  let issue = new Issue(req.body);
  issue.save()
       .then(issue => {
         res.status(200).json('Successfully added a new issue');
       })
       .catch(error =>{
         res.status(400).send('Failed to create a new issue')
         console.log(error)
       })
});

router.route('/issues/update/:id').post((req, res) => {
  let new_issue = new Issue(req.body);
  Issue.findById(req.params.id, (err, issue) => {

    if(!issue){
      return next(new Error("Couldnt load the request issue"))
    } else {
      issue = new_issue;
      issue.save()
           .then(issue => {
             res.status(200).json('Successfully updated ' + req.params.id + ' issue');
           })
           .catch(error => {
             res.status(400, 'Failed to update issue #' + req.params.id)
           })
    }
  });
});

router.route('/issues/delete/:id').delete((req, res) => {
  Issue.findByIdAndRemove(req.params.id , (err, issue) => {
    if(err){
      console.log(error);
    } else {
      res.json('Removed Successfully');
    }
  });
});

app.use('/', router);

app.listen(port, () => console.log("Express server running on port "  + port))

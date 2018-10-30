import mongoose from 'mongoose';

// Need to connect to a running mongo DB
// TODO : Use process.env to get those values
const mongoDbProtocol = 'mongodb';
const mongoDbHostName = 'localhost';
const mongoDbPort = '27017';

const mongooseOptions = { useNewUrlParser : true };

function getMongoDbUrl(){
  return `${mongoDbProtocol}://${mongoDbHostName}:${mongoDbPort}`
}

function connectTo(collection){
  var mongoDbCollection = `${getMongoDbUrl()}/${collection}`;
  
  return mongoose.connect(mongoDbCollection, mongooseOptions);
}


export default { connectTo, getMongoDbUrl }

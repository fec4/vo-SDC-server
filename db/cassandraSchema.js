// var cassandra = require('cassandra-odm');
// var Schema = cassandra.Schema;
// const generate = require('./helpers/dataGenerator');
// var firstEntry = generate.generateData;
// firstEntry.id = 0;

// var config = {keyspace: "bareBnB", hosts: ["127.0.0.1:9042"]};
// cassandra.connect(config);

// var homeSchema = new Schema({
//   id: Number,
//   type: String,
//   description: String,
//   tags: String,
//   price: String,
//   location: String,
//   image: String,
//   rating: Number,
//   numRatings: Number
// })

// homeSchema.post('save', (model) => {
//   console.log("A new home has been registered!");
// });

// var Home = cassandra.model('Home', homeSchema);

// var syncOptions = {debug: true, prettyDebug: true, warning: true};
// cassandra.syncTables(config, syncOptions, (err, res) => {
//   console.log(err);

//   var newHome = new Home(firstEntry);

//   newHome.save({debug: true, prettyDebug: true}, (err, res) => {
//     if (err) console.log(err);

//     cassandra.close();
//   })
// })
var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');
var cassandra = require('cassandra-driver');
var async = require('async');
const path = require('path');

var client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1' });

var insert = "INSERT INTO barebnb.home ( \
  id, \
  type, \
  description, \
  tags, \
  price, \
  location, \
  image, \
  rating, \
  num_ratings) \
  VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";

async.series([
  function(next) {initCassandraSchema(client, next)},
  function(next) {
    // var parser = parse({delimiter: '|'})
    // var input = fs.createReadStream(path.join(__dirname, '/data/cassandraData.csv'));

    // var transformer = transform(function(line) {
    //   client.execute(insert, parseData(line), {prepare:true, consistency:cassandra.types.consistencies.one}, next);
    //   return line;
    // });

    // transformer.on('error', next);

    // input.pipe(parser).pipe(transformer);
    var stream = client.execute(`COPY barebnb.home FROM STDIN DELIMITER '|'`, next);
    var fileStream = fs.createReadStream(path.join(__dirname, '/data/cassandraData.csv'));

    fileStream.on('error', next);
    stream.on('error', next);
    fileStream.pipe(stream);
  }
], displayError);

function initCassandraSchema(client, next) {
  console.log("********** Initializing schema for demo **********")

  async.waterfall([
    function(nextCall) {
      client.execute("CREATE KEYSPACE IF NOT EXISTS barebnb WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 }", [], nextCall);
    },
    function(nextCall) {
      client.execute("CREATE TABLE IF NOT EXISTS barebnb.home ( \
        id bigint PRIMARY KEY, \
        type text, \
        description text, \
        tags text, \
        price text, \
        location text, \
        image text, \
        rating smallint, \
        num_ratings int)", [], nextCall);
    },
    function(nextCall) {
      client.execute("TRUNCATE barebnb.home", [], nextCall)
    }
  ], next);
}

function parseData(line) {
  return [parseInt(line[0]), line[1], line[2], line[3], line[4], line[5], line[6], parseInt(line[7]), parseInt(line[8])]
};

function displayError(err) {
  if(err) console.log(`Error encountered: ${err}`);
}
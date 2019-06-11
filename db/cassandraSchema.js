var cassandra = require('cassandra-odm');
var Schema = cassandra.Schema;
const generate = require('./helpers/dataGenerator');
var firstEntry = generate.generateData;
firstEntry.id = 0;

var config = {keyspace: "BareBnB", hosts: ["127.0.0.1:9042"]};
cassandra.connect(config);

var homeSchema = new Schema({
  id: Number,
  type: String,
  description: String,
  tags: String,
  price: String,
  location: String,
  image: String,
  rating: Number,
  numRatings: Number
})

homeSchema.post('save', (model) => {
  console.log("A new home has been registered!");
});

var Home = cassandra.model('Home', homeSchema);

var syncOptions = {debug: true, prettyDebug: true, warning: true};
cassandra.syncTables(config, syncOptions, (err, res) => {
  console.log(err);

  var newHome = new Home(firstEntry);

  newHome.save({debug: true, prettyDebug: true}, (err, res) => {
    if (err) console.log(err);

    cassandra.close();
  })
})
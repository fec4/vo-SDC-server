const fs = require('fs');
const path = require('path');
const { Pool, Client } = require('pg');
const copyFrom = require('pg-copy-streams').from
const config = require('./config.json');

var inputFile = path.join(__dirname, '/data/entryData1.csv');
var targetTable = 'home'

const host = config.host;
const user = config.user;
const pw = config.pw;
const db = config.db;
const port = config.port;
const conString = `postgresql://${user}:${pw}@${host}:${port}/${db}`;
const tableString = `CREATE TABLE IF NOT EXISTS home( type VARCHAR, description VARCHAR, tags VARCHAR, price VARCHAR, location VARCHAR, image VARCHAR, rating SMALLINT, "numRatings" SMALLINT );`

//connecting to Database

const pool = new Pool({
  connectionString: conString
});

const client = new Client({
  connectionString: conString
})

client.connect();

client.query(tableString, (err, res) => {
  console.log(err, res);
});

const executeQuery = (targetTable) => {
  const execute = (target, callback) => {
    client.query(`Truncate ${target}`, (err) => {
      if (err) {
        client.end();
        callback(err);
      } else {
        console.log(`Truncated ${target}`);
        callback(null, target);
      }
    })
  }
  //Executing Copy Function

  execute(targetTable, (err) => {
    if (err) return console.log(`Error in Truncate Table: ${err}`)
    var stream = client.query(copyFrom(`COPY ${targetTable} FROM STDIN DELIMITER '|' CSV`));
    var fileStream = fs.createReadStream(inputFile);

    fileStream.on('error', (err) => {
      console.log(`Error in creating read stream ${err}`);
    })
    stream.on('error', (err) => {
      console.log(`Error in creating stream ${err}`);
    })
    stream.on('end', () => {
      console.log(`Completed loading data into ${targetTable}`);
      client.end();
    })
    fileStream.pipe(stream);
  })
}

executeQuery(targetTable);



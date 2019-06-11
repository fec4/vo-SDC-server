const fs = require('fs');
const generate = require('../helpers/dataGenerator');
const home = require('os').homedir();
var path = home + '/Cam5-5ervice/db/data/';

let start = 1;
let max = 50;
let current = 1;
console.time('Time Start!');

let seedEntry = (start, max, current) => {
  if (start > max) {
    console.timeEnd('Time Stop. Data generation completed in ----');
    current = 1;
    return;
  } else {
    let string = "";
    for(var i = 0; i <= 200000; i++) {
      let generatedData = generate.generateData;
      let entry = `${current}|${generatedData.type}|${generatedData.description}|${generatedData.tags}|${generatedData.price}|${generatedData.location}|${generatedData.image}|${generatedData.rating}|${generatedData.numRatings}`;
      string += entry + '\n';
      current++;
    }

    fs.appendFile(path + 'cassandraData.csv', string, (err) => {
      if (err) throw err;
      console.log('Finished loop ' + start);
      start++;
      seedEntry(start, max, current);
    });
  }
}

seedEntry(start, max, current);

/*
look into StringBuilder to increase speed of data generation.
*/
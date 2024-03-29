const fs = require('fs');
const generate = require('../helpers/dataGenerator');
const home = require('os').homedir();
var path = home + '/Cam5-5ervice/db/data/';

let start = 1;
let max = 20;
let current = 1;
let count = 0;
console.time('Data for PostgreSQL completed in');

let seedEntry = (start, max, current) => {
  if (start > max) {
    console.timeEnd('Data for PostgreSQL completed in');
    current = 1;
    return;
  } else {
    let string = "";
    for(var i = 0; i <= 500000; i++) {
      let generatedData = generate.generateData();
      let entry = `${count}|${generatedData.type}|${generatedData.description}|${generatedData.tags}|${generatedData.price}|${generatedData.location}|${generatedData.image}|${generatedData.rating}|${generatedData.numRatings}`;

      string += entry + '\n';
      current++
      count++;
    }

    fs.appendFile(path + 'entryData1.csv', string, (err) => {
      if (err) throw err;
      console.log('Finished loop ' + start);
      start++;
      seedEntry(start, max, current);
    })
  }
}

seedEntry(start, max, current);
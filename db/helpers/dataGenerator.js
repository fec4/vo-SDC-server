const faker = require('faker');
const pictures = require('./pictures');

let types = ['ENTIRE GUEST SUITE', 'PRIVATE ROOM', 'ENTIRE GUESTHOUSE', 'ENTIRE APARTMENT', 'ENTIRE CABIN', 'ENTIRE HOUSE', 'TREEHOUSE', 'ENTIRE LOFT', 'ENTIRE BUNGALOW', 'ENTIRE COTTAGE', 'CASA PARTICULAR', 'ENTIRE CONDOMINIUM', 'ENITRE TOWNHOUSE']

let tags = ['Private', 'Self check-in', 'Sparkling clean', 'Superhost', 'Great check-in experience', 'Entire', 'Great location', 'Great Value', 'Great check-in experience' ]


module.exports.generateData = () => {
  const entry = {};

  entry.type = types[Math.floor(Math.random() * types.length)];

  entry.description = faker.lorem.paragraph();

  entry.tags = tags[Math.floor(Math.random() * tags.length)];

  entry.price = faker.commerce.price();

  entry.location = faker.address.city();

  entry.image = pictures.data[Math.floor(Math.random() * pictures.data.length)];

  entry.rating = Math.floor(Math.random() * 5);

  entry.numRatings = Math.floor(Math.random() * 9999);

  return entry;
}
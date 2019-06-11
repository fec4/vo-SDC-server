// model and schema exports
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/fetcher');

// const homeSchema = mongoose.Schema({
//   type: String,
//   tags: String,
//   price: Number,
//   location: String,
//   rating: Number,
//   numRatings: Number,
//   description: String,
//   image: String
// })

// const Home = mongoose.model('Home', homeSchema)

// module.exports = Home

const { Pool } = require('pg');

const pool = new Pool;

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now - start;
      console.log('executed query', { text, duration, rows: res.rowCount })
      callback(err, res);
    })
  }
}
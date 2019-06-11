const Router = require('express-promise-router');

const db = require('../db')

const router = new Router();

module.exports = router

router.get('/homes', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM homes')
  res.send(rows)
})


/*
POSTing to /homes
- this would allow user to add a new picture/listing to the database

GET to /homes
- this would return the most recent listings

PUT to /homes
- this would update the listing matching the listing ID of the request

DELETE to /homes
- this would remove a listing matching the listing ID of the request
*/

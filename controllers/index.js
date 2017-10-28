const express = require('express');
const router = express.Router();

router.use('/api', require('./api.js'));

router.get('/', (req, res) => {
  res.redirect('/api');
});

module.exports = router;

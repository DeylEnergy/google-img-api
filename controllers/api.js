const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
  res.end('This is api page');
});
router.get('/imagesearch/:query', (req, res) => {
  const url = 'https://www.googleapis.com/customsearch/v1';
  const key = 'AIzaSyDZ-NAjYtqtlAIY4k76C40DyQ6dUbCQpkg';
  const cx = '012819362395033083409:gwad5ihhulw';
  const query = req.params.query;
  const fullUrl = `${url}?key=${key}&cx=${cx}&searchType=image&q=${query}`;
  request.get(fullUrl, (err, response, body) => {
    if (!err && response.statusCode == 200){
      res.json(JSON.parse(body).items);
    }
  });
});
router.get('*', (req, res) => {
  res.redirect('/');
});
module.exports = router;

const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
  res.end('This is api page');
});
router.get('/imagesearch/:query', (req, res) => {
  const api = 'https://www.googleapis.com/customsearch/v1';
  const key = 'AIzaSyDZ-NAjYtqtlAIY4k76C40DyQ6dUbCQpkg';
  const cx = '012819362395033083409:gwad5ihhulw';
  const query = req.params.query;
  const off = req.query.offset || 1;
  const url = `${api}?key=${key}&cx=${cx}&searchType=image&q=${query}&start=${off}`;
  request.get(url, (err, response, body) => {
    if (!err && response.statusCode == 200){
      let data = [];
      body = JSON.parse(body).items;
      body.forEach((val) => {
        data.push({
          url: val.link,
          snippet: val.snippet,
          thumbnail: val.image.thumbnailLink,
          context: val.image.contextLink
        });
      });
      res.json(data);
    }
  });
});
router.get('*', (req, res) => {
  res.redirect('/');
});
module.exports = router;

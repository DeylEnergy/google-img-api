const express = require('express');
const app = express();

app.use(require('./controllers'));

app.listen(3000, () => {
  console.log('Listening to 3000');
});

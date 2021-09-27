const express = require('express');
const app = express();
const port = 3000;

app
.get('/', (req, res) => {
  res.send('Hello World!');
})
.get('/test', (req, res) => {
  res.send('Hello this is a test.');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

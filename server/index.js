const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const staticPath = path.join(__dirname, '../static');
app
.use('/imgs', express.static(path.join(staticPath, '/imgs')))
.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, '/index.html'));
})
.get('/profile', (req, res) => {
  res.sendFile(path.join(staticPath, '/profile.html'));
})
.get('/exercise-info', (req, res) => {
  res.sendFile(path.join(staticPath, '/exercise.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const express = require('express');
const path = require('path');
require('dotenv').config()
const usersController = require('./controllers/users');
const postsController = require('./controllers/posts');

const app = express();
const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, '../docs');
app
    .use('/', express.static(staticPath))

    .use(express.json())
    .use('/users', usersController)
    .use('/posts', postsController)

app
    .get('*', (req, res) => res.sendFile(path.join(staticPath, '/index.html')))

app
    .use((err, req, res, next)=>{
        res.status(err.code || 500).send(err);
    })

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})

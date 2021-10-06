const express = require('express');
const path = require('path');
const usersRoutes = require('./routes/users');
const gifsRoutes = require('./routes/gifs');
const commentsRoutes = require('./routes/comments');

const helmet = require('helmet');

const app = express();

app.use(helmet());


app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/gifs', express.static(path.join(__dirname, 'gifs')));

app.use('/api/users', usersRoutes);
app.use('/api/gifs', gifsRoutes);
app.use('/api/comments', commentsRoutes);



module.exports = app;
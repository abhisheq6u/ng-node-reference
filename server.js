var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var constr = 'mongodb://admin:emco9636@ds261660.mlab.com:61660/nody';

mongoose.connect(constr)
    .then(()=>console.log('Mongoo'))
    .catch((err)=>console.log(err))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(5600, () => console.log('Server started on port 5600'));

app.get('/', (req, res) => res.send('Home'));

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const story = require('./routes/api/story');
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/story', story);
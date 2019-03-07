const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const follows = require('./routes/api/follows');
const feed = require('./routes/api/feed');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose.connect(db).then(()=> console.log('MongoDb Connected'))
.catch(err=> console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/follow', follows);
app.use('/api/feed', feed);

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  //Set a static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

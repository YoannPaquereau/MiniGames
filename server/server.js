const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const friends = require('./routes/api/friends');

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
    .connect(
        db,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err))
;

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/friends', friends);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port}`));
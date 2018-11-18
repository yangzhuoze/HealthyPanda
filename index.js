const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/users/:id', function (req, res) {
    var data = require('./data.json');
    var users = data.user;
    var foundUser = null;
    const id = req.params.id
    for (var i = 0; i < users.length; i ++) {
        user = users[i];
        if (user.NationalId == id) {
            foundUser = user
        }
    }
    if (foundUser === null) {
        res.status(404).end('User not found!');
    } else {
        res.json(foundUser)
    }
})

app.post('/users', function (req, res) {
    var type = req.params.type
    var source = req.params.source
    if (type == 'bank') {
        if (source == 'HSBC') {
            // TODO Retrieve user info from HSBC
        } else if (source == 'SC') {
            // TODO Retrieve user info from Standard Chartered
        } else if (source == 'CCB') {
            // TODO Retrieve user info from China Construction Bank
        }
    } else if (type == 'SocialMedia') {
        if (source == 'Wechat') {
            // TODO Retrieve user info from wechat
        } else if (source == 'Facebook') {
            // TODO Retrieve user info from Facebook
        } else if (source == 'Alibaba') {
            // TODO Retrieve user info from Alibaba
        } else if (source == 'Linkedin') {
            // TODO Retrieve user info from Linkedin
        }
    }
    // ... more
    // TODO persist into DB.
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
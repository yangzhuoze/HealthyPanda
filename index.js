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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
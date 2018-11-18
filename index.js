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
        scanUserSocialMedia()
    }
    // ... more
    // TODO persist into DB.
})

app.get('/engine', function (req, res) {
    // should start a thread to run the analyse engine
    userAnalyseEngine(req.params.userId)
})

var scanUserSocialMedia = function (req, res) {
    const request = require('request');
    const fs = require('fs');

    // Access user public profile usign agent's authenticated token
    var token = req.params.token
    var userId = req.params.userId

    var user = {}
    var dir = ''
    var dbUser = findUserByUserId(userId)
    if (dbUser !== undefined) {
        user = dbUser
    }

    if (source == 'Wechat') {
        request(`http://api.wechat.com/users/${userId}/detail`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                user.push(data)
            }
        });

        // Scan wechat user's public circle picture
        // get post list
        var posts = []
        request(`http://api.wechat.com/users/${userId}/circles`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                posts.push(body)
                dir = '/app/wechat/users/' + userId;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
            }
        });

        // for analysing in later step
        if (posts !== undefined || posts.length === 0) {
            for (post in posts) {
                request(`http://api.wechat.com/users/${userId}/circles/${post.id}`, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        fs.writeFile(`${dir}/${post.id}`, message);
                    }
                });
            }
        }
    } else if (source == 'Facebook') {
        // TODO Retrieve user info from Facebook
        // ... same as above, but to change the API url
    } else if (source == 'Alibaba') {
        // TODO Retrieve user info from Alibaba
    } else if (source == 'Linkedin') {
        // TODO Retrieve user info from Linkedin
    }
    saveUser(users)
}

// ORM
var findUserByUserId = function (userId) {
    const conn = getConnection()
    var user = conn.query(`SELECT * FROM TUser WHERE UserId = ${userId}`)
    return user
}

var saveUser(user) {
    // TODO
}

var getConnection = function () {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'panda001',
        password : 'pandawithhealthydiet',
        database : 'HPDEV'
    });

    connection.connect()
}

var userAnalyseEngine = function (userId) {
    // analyse the user with the retrieved photo

}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
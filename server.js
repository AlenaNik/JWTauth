require('dotenv').config();

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    },
    {
        username: 'Nick',
        title: 'Post 3'
    }
]


app.get('/posts', authenticateToken, (req, res, err) => {

    res.json(posts.filter(post => post.username === req.user.name));
})


// Middleware

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`listening on ${PORT} some port`));

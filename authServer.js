require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

let refreshTokens = []

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({accessToken: accessToken})
    })
})

app.post('/login', (req, res, err) => {
    //Auth user
    const username = req.body.username
    const user = { name: username }

    const accessToken =  generateAccessToken(user)
    // refreshToken
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshToken.push(refreshToken)
    res.json({accessToken: accessToken, refreshToken: refreshToken})
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(200)
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}


const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => console.log(`listening on ${PORT} some port`));

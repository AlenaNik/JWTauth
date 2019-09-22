const express = require('express');
const app = express();


const posts = [
    {
        username: 'Ale',
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


app.get('/posts', (req, res, err) => {
    res.json(posts);
})

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`listening on ${PORT} some port`));
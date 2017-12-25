const express = require('express')
const jwt = require('jsonwebtoken')

const PORT = 5000

const app = express()


app.get('/api', (req, res) => {
    res.json({
        message: "Welcome to the API"
    })
})

app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post Created',
                auth: authData
            })
        }
    })
})

app.post('/api/login', (req, res) => {

    // Mock user
    const user = {
        id: 1,
        username: 'xdavidel',
        email: 'something@gmail.com'

    }

    jwt.sign({ user: user }, 'secretkey', { expiresIn: '20m' }, (err, token) => {
        res.json({
            token: token
        })
    })
})

// Token Format
// Authorization : Bearer <access_token>

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))

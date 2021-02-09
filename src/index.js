const express = require('express')
const bodyParser = require('body-parser')
const Post = require('./app/models/Post')
const cors = require('cors')
require('dotenv').config()
const env = require('../.env')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use(cors())

app.get('/', async (req, res) => {
    try {
        const posts = await Post.find()

        res.json({ posts })
    }catch (err) {
        res.status(400).send({ error: 'Error on search posts' })
    }
})

app.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findOne({ _id: req.params.postId})

        res.send({ post })
    } catch (err) {
        res.status(400).send({ error: 'Error on show post' })
    }
})

require('./app/controllers/postController')(app)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(3000, () => console.log('Server on'))
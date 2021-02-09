const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body
        const post = await Post.create({title, content})

        res.redirect(req.body.redirect)
    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'Error on create post' })
    }
})

router.put('/:postId', async (req, res) => {
    try {
        const { title, content } = req.body
        const post = await Post.findByIdAndUpdate( req.params.postId, {
            title,
            content
        }, {new: true})

        res.send({ post })
    } catch (err) {
        res.status(400).send({ error: 'Error on update post '})
    }
})

router.delete('/:postId', async (req, res) => {
    try {
        await Post.deleteOne({_id: req.params.postId})

        res.send()
    } catch (err) {
        res.status(400).send({ error: 'Error on delete post' })
    }
})

module.exports = app => app.use('/posts', router)
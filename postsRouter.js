const express = require('express');
const Data = require('./data/db');

const router = express.Router();

router.post('/', (req, res) => {
    Data.insert(req.body)
        .then(newPost => {
            res.status(201).json(newPost);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'There was an error while saving the post to the database'})
        })
})

router.post('/:id/comments', (req, res) => {
    Data.insertComment(req.params.id)
        .then(newComment => {
            if (!id) {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            } else if (!text) {
                res.status(400).json({ errorMessage: 'Please provide text for the comment' })
            } else {
                res.status(201).json(newComment)
            }
        })
})

router.get('/', (req, res) => {
    Data.find(req.query)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Error retrieving posts'})
        })
})

router.get('/:id', (req, res) => {
    Data.findById(req.params.id)
        .then(post => {
            if(!post) {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            } else {
                res.status(200).json(post)
            }
        })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    Data.findCommentById(req.params.id)
        .then(comment => {
            if (!id) {
                res.status(404).json({ message: 'The post with the specified ID does not exist' })
            } else if (id) {
                res.status(200).json(comment)
            } else {
                res.status(500).json({ Error: 'The comments information could not be retrieved' })
            }
        })
})

router.delete('/:id', (req, res) => {
    Data.remove(req.params.id)
        .then(post => {
            if (post === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post)
            }
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body
    Data.update(req.params.id, changes)
        .then(changedPost => {
            if (changedPost) {
                res.status(200).json(changedPost)
            } else if (!title || !contents) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "The post information could not be modified."})
        })
})

module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Story = require('../../models/Story');

const getToken = require('../../config/getToken');

router.get('/', (req, res) => {
    res.send('Hello from the Story Route');
});

// Get All Stories ( private )
router.get('/all', (req, res) => {
    Story.find({})
        .then((stories) => {
            res.json(stories);
        })
})

// Create a Story ( private )
router.post('/create', getToken, (req, res) => {

    jwt.verify(req.token, 'secret', (err, authData) => {
        if(err) throw err;
        // Trim string
        keywords = req.body.keywords;
        keyarr = keywords.split(',');

        // New story object
        newStory = new Story({
            author: req.body.author,
            title: req.body.title,
            intro: req.body.intro,
            img: req.body.img,
            keywords: keyarr
        });

        newStory.save()
            .then(story => res.json(story))
            .catch(err => res.json(err))

    });

})

// Update a Story ( private )
router.post('/update/:id', getToken, (req, res) => {

    jwt.verify(req.token, 'secret', (err, authData) => {
        if(err) throw err;

        kw = req.body.keywords;
        skw = kw.split(',');

        const obj = {
            title: req.body.title,
            intro: req.body.intro,
            img: req.body.img,
            keywords: skw,
            chapters: req.body.chapters
        }

        // Find and update story
        Story.findOneAndUpdate({_id: req.params.id}, {$set:obj}, {new: true}, function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        
            res.send(doc);
        });
        

    });

})

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const getToken = require('../../config/getToken');

// router.get('/', (req, res) => res.send('Hey Domino!'))

// Create profile route ( private )
router.post('/create', getToken, (req, res) => {

    jwt.verify(req.token, 'secret', (err, authData) => {
        if(err) throw err;

        newProfile = new Profile({
            user: req.body.user,
            handle: req.body.handle,
            bio: req.body.bio,
            website: req.body.website,
            social: {
                facebook: req.body.facebook,
                twitter: req.body.twitter,
                instagram: req.body.instagram,
                youtube: req.body.youtube
            }
        })
    
        newProfile.save()
            .then((profile) => {
                res.json(profile);
            })
            .catch(err => res.json({err}));
    });
    
});

router.get('/populate/:id', (req, res) => {
    Profile.findOne({_id: req.params.id})
        .populate('user')
        .exec((err, data) => {
            if(err) throw err;
            res.json(data)
        })
});

module.exports = router;
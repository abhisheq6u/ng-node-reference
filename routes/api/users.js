const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const router = express.Router();

const getToken = require('../../config/getToken');
const User = require('../../models/User');

router.get('/', (req, res) => res.send('Hey Domino!'))

// Register route ( public )
router.post('/register', (req, res) => {

    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                return res.status(400).json({ error: 'Email already exists' });
            }else{

                // Get avatar from Gravatar
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                })

                // Create new user object
                const newUser = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    dob: req.body.dob,
                    avatar: avatar
                })
                
                //Hash Password
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        if (err) throw err;

                        // Store hash in your password DB.
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });

            }
        })
        .catch(err => console.log(err));

})

// Login route ( public )
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
        .then((user)=>{
            if(!user){

                // Give 'not found' error
                return res.status(404).json({error: 'user not found'})
            
            }else{

                // Compare hashed password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch){

                            // Create a payload
                            const payload = {
                                id: user.id,
                                firstname: user.firstname,
                                email: user.email
                            }

                            // Sign a token
                            jwt.sign(payload, 'secret', { expiresIn: '1h' }, (err, token) => {
                                res.json({
                                    token: token
                                })
                            });

                        }else{
                            return res.status(400).json({error: 'auth failed'})
                        }
                    })

            }
        })
});

// Get current user route ( private )
router.get('/current', getToken, (req, res) =>{
    // Verify token
    jwt.verify(req.token, 'secret', (err, authData) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({authData});
        }
    });
});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const User = require('../model/userModel');

// Handle incoming GET requests to /users.
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                console.log(doc);
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry found for the provided ID.' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}); 

router.post('/', (req, res, next) => {
    var user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        NIC: req.body.nic,
        userType: req.body.type
    });

    user.save().then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });

    res.status(200).json({
        message: 'Reply for POST request.',
        createdUser: user
    });
});

router.get('/:email/:password', (req, res, next) => {
    var query = {
        email: req.params.email,
        password: req.params.password
    };

    User.find(query)
    .then(users=>{
        res.status(200).json(users);
    })
    .catch(err=>{
        res.status(500).json({error: err});
    });
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Handle incoming GET requests to /users.
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Reply for GET request.'
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if(id === 'special'){
        res.status(200).json({
            message: 'Id has been discovered.',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID.'
        });
    }
});

router.post('/', (req, res, next) => {
    const user = {
        name: req.body.uName,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type
    };
    console.log(req.body.uName);
    res.status(200).json({
        message: 'Reply for POST request.',
        createdUser: user
    });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;

    res.status(200).json({
        message: 'Reply for DELETE request.',
        id: id
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'Reply for PATCH request.'
    });
});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');

const router = express.Router();

const CardPayment = require('../model/cardPaymentModel');
const twilio = require('../notifier');

router.post('/', (req, res, next) =>{
    var payment = new CardPayment({
        cardNo: req.body.cardno,
        cvc: req.body.cvc,
        amount: req.body.amount,
        trainRoute: req.body.route,
        noOftickets: req.body.tickets,
        dateTime: moment().format('yyyy-mm-dd:hh:mm:ss')
    });
    
    payment.save()
    .then(result =>{
        res.status(200).json(result);
        
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    });
});
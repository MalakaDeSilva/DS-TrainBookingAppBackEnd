const express = require('express');
const moment = require('moment');
const twilio = require('twilio');
const nodeMailer = require('nodemailer');

const router = express.Router();

const MobilePayment = require('../model/mobilePaymentModel');

const AccountSid = 'AC8c1239baa4854f62534587f0d51feef2';
const AuthToken = '83af64fa3e9f7cdfb36a67fbef49080b';
const client = new twilio(AccountSid, AuthToken);
const twilioNumber = '+19386665693';

router.post('/', (req, res, next) => {
    var payment = new MobilePayment({
        amount: req.body.totAm,
        trainRoute: req.body.trainR,
        noOftickets: req.body.nticks,
        dateTime: moment().format('yyyy-mm-dd:hh:mm:ss')
    });

    var user = {
        email: req.body.email,
        phone: req.body.phone
    }

    var det = {
        trainRoute: payment.trainRoute,
        time: payment.dateTime,
        numberOfTickets: payment.noOftickets,
        amount: payment.amount
    }

    payment.save()
        .then(result => {
            res.status(200).json(result);
            
            sendSMS(user.phone, det);
            sendEmail(user.email, det);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

function sendSMS(number, details) {
    let message = 'Thank you for using TrainBooking. Your train details,\n' +
        'Route: ' + details.trainRoute + '.' +
        'Time: ' + details.time + '.';

    client.messages.create(
        {
            to: number,
            from: twilioNumber,
            body: message
        },
        (err, message) => {
            console.log(message.sid);
        }
    );
}

function sendEmail(email, details) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'booklktrain416@gmail.com',
            pass: 'b00ktr@!n'
        }
    });
    let mailOptions = {
        from: '"BookMyTrain" <booklktrain416@gmail.com>',
        to: email,
        subject: "Ticket Booking Information",
        text: 'Thank You for using TrainBooking. Your payment receipt has been sent to Your Email.\nTrain Route :' + details.trainRoute + '. \nNumber of Tickets :' + details.numberOfTickets + '. \nTotal Amount :' + details.amount + '.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        //res.render('index');
    });
}

module.exports = router;
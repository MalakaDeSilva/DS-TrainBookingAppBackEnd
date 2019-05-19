const twilio = require('twilio');

const AccountSid = 'AC8c1239baa4854f62534587f0d51feef2';
const AuthToken = '83af64fa3e9f7cdfb36a67fbef49080b';
const client = new twilio(AccountSid, AuthToken);
const twilioNumber = '+19386665693';

function sendSMS(number, details) {
    let message = 'Thank you for using TrainBooking. Your train details,\n' +
        'Route: ' + details.route + '.' +
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
        text: 'Thank You for using TrainBooking. Your payment receipt has been sent to Your Email.\nTrain Route :' + details.trainRoute + '. \nNumber of Tickets :' + details.numberOfTickets + '. \nTotal Amount :' + details.amount + '. \nPaid by : ' + details.paymentType + '.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        //res.render('index');
    });
}

module.exports = notifier;
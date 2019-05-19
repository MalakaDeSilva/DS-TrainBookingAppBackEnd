const twilio = require('twilio');

const AccountSid = 'AC8c1239baa4854f62534587f0d51feef2';
const AuthToken = '83af64fa3e9f7cdfb36a67fbef49080b';
const client = new twilio(AccountSid, AuthToken);
const twilioNumber = '+19386665693';

function sendSMS(number, details) {
    let message = 'Thank you for using TrainBook app. Your train details,\n' +
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
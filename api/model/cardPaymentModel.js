const mongoose = require('mongoose');

const cardPaymentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    trainRoute: {
        type: String
    },
    noOftickets: {
        type: Number
    },
    cardNo: {
        type: Number,
        required: true
    },
    cvc: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dateTime: {
        type: String
    }
});

module.exports = mongoose.model('CardPayment', cardPaymentSchema);
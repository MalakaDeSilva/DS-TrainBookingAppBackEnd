const mongoose = require('mongoose');

const mobilePaymentScehma = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    trainRoute: {
        type: String
    },
    noOftickets: {
        type: Number
    },
    amount: {
        type: Number,
        required: true
    },
    dateTime: {
        type: String
    }
});
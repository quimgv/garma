const mongoose = require('mongoose')

const favourRequestsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    helper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    favour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favour'
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending' // Pending, Accepted, Declined
    },
    show: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true
})

const FavourRequests = mongoose.model('FavourRequests', favourRequestsSchema);

module.exports = FavourRequests;
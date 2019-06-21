const mongoose = require('mongoose')

const favourSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String, // Easy, Medium, Hard
        required: true
    },
    urgency: {
        type: String, // Urgent, Within week, Within month, Anytime
        required: true
    },
    categories: {
        type: [String]
    },
    owner: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Users'
        },
        status: {
            type: String,
            default: null // In progress, Completed
        }
    },
    helper: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
            ref: 'Users'
        },
        status: {
            type: String,
            default: null // In progress, Completed
        }
    },
    status: {
        type: String,
        default: 'Open' // Open, In progress, Completed
    },
    conflict: {
        status: {
            type: Boolean,
            default: false
        },
        setBy: {
            type: String // Owner, helper
        },
        message: {
            type: String
        }
    }
},{
    timestamps: true
})

const Favour = mongoose.model('Favour', favourSchema);

module.exports = Favour;
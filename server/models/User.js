const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    friends: {
        type: Array,
        required: false
    },

    friendsRequest: {
        type: Array,
        required: false
    },

    friendsRequestSend: {
        type: Array,
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("users", UserSchema);
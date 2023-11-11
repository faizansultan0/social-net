const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },    
    email: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        url: String,
        publicId: String,
    },
    password: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    about: {},
    following: [{
        type: Schema.ObjectId,
        ref: 'User',
    }],
    followers: [{
        type: Schema.ObjectId,
        ref: 'User',
    }, {
        timestamps: true,
    }]
})

module.exports = mongoose.model('User', userSchema);
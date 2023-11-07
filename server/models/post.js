const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    content: {
        type: {},
        required: true,
    },
    postedBy: {
        type: Schema.ObjectId,
        ref: "User"
    },
    image: {
        url: String,
        publicId: String,
    },
    likes: [{
        type: Schema.ObjectId,
    }],
    comments: [{
        text: String,
        created: {
            type: Date,
            default: Date.now
        },
        postedBy: {
            type: Schema.ObjectId,
            ref: 'User'
        }
    }]
}, { 
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema);
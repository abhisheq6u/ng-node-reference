const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    publishedat:{
        type: Date,
        default: Date.now
    },
    img:{
        type: String,
        required: true
    },
    keywords:{
        type: [String],
    },
    chapters: {
        type: [Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('story', storySchema);
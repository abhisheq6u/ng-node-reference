const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    story:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'story'
    },
    title: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    content:{
        type: String
    },
    publishedat:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('chapter', chapterSchema);
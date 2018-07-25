const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    story:{
        type:Schema.Types.ObjectId,
        ref: 'story'
    },
    reader:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    rating:{
        type: Number,
        required: true
    },
    review:{
        type: String
    }
});

module.exports = mongoose.model('review', reviewSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const profileSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle:{
        type: String,
        max: 40
    },
    bio: {
        type:String
    },
    website: {
        type: String
    },
    location:{
        type: String
    },
    social: {
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        twitter: {
            type: String
        },
        youtube: {
            type: String
        }
    }
});

module.exports = mongoose.model('profile', profileSchema);
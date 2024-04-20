const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Rating is required']
    },
    body: {
        type: String,
        required: [true, 'Body is required']
    }
});

module.exports = mongoose.model('Review', reviewSchema)
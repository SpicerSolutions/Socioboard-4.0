const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const dailyMotionPost = new Schema({
    dailyMotionId: { type: String, index: true, unique: true },
    sourceUrl: { type: String, },
    title: { type: String },
    description: { type: String },
    publisherName: { type: String },
    publishedDate: { type: Date, default: Date.now },
    mediaUrl: { type: [String] },

    batchId: { type: String },
    serverMediaUrl: { type: String },
    createdDate: { type: Date, default: Date.now },
    version: { type: String, index: true }
});

dailyMotionPost.methods.insertManyPosts = function (posts) {
    return this.model('DailyMotionPosts')
        .insertMany(posts)
        .then((postdetails) => {
            return postdetails.length;
        })
        .catch((error) => {
            return 0;
        });
};

dailyMotionPost.methods.getPreviousPost = function (skip, limit) {

    return this.model('DailyMotionPosts')
        .find({})
        .sort({ publishedDate: -1 })
        .skip(skip)
        .limit(limit)
        .then(function (result) {
            return result;
        })
        .catch(function (error) {
            console.log(error);
        });
};

const dailyMotionPostModel = mongoose.model('DailyMotionPosts', dailyMotionPost);

module.exports = dailyMotionPostModel;

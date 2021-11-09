const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { toJSON, paginate } = require( './plugings');

// schema for posts
const Posts = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        authorId: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
);
Posts.plugin(toJSON);
Posts.plugin(paginate);

module.exports = mongoose.model('Post', Posts);

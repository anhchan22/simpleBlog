const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: [true, "Please provide slug"],
        unique: [true, "Slug Exist"],
    },
    title: {
        type: String,
        required: [true, "Please provide a title!"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description!"],
    },
    comments: [{
        username: String,
        name: String,
        text: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

module.exports = mongoose.model.Posts || mongoose.model("Posts", PostSchema);

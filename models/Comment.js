//Required modules
const mongoose = require("mongoose");

//Reference to the schema Constructor
const Schema = mongoose.Schema;

//Using the schema constructor to create a new comment object
const CommentSchema = new Schema({
    //Title of the comment as a string
    title: String,
    //Comment body as a string
    body: String
});

//Creating the model from the schema
const comment = mongoose.model("Comment", CommentSchema);

//Exporting the comment model
module.exports = comment;
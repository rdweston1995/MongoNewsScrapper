//Required modules
const mongoose = require("mongoose");

//Reference to the schema constructor
var Schema = mongoose.Schema;

//Using the schema constructor creating a new schema for the Article
var ArticleSchema = new Schema({
    //Title of the article
    title: {
        type: String,
        required: true
    },
    //Link to the article
    link: {
        type: String,
        required: true
    },
    //Comments on this article
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

//Creating the model from the schema
var Article = mongoose.model("Article", ArticleSchema);

//Exporting the Article model
module.exports = Article;
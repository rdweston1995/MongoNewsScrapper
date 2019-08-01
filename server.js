var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//Scrapping tools
var axios  = require("axios");
var cheerio = require("cheerio");

//Require all models
var db = require("./models");

var PORT = 3000;

//Initialize Express
var app = express();

//Use morgan logger for logging requests
app.use(logger("dev"));
//Parse request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
//Make public a static folder
app.use(express.static("public"));

//Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongonewsscrapper", {useNewUrlParser: true});

//Routes
app.get("/scrape/:subreddit", function(req, res){
    axios.get("https://old.reddit.com/r/" + req.params.subreddit + "/").then(function(response){
        var $ = cheerio.load(response.data);
        console.log(response.data);
        $("p.title").each(function(i, element){
            var result = {};

            console.log(this);
            //Save title
            result.title = $(element).text();

            //Save Link
            result.link = $(element).children().attr("href");

            db.Article.create(result)
                .then(function(dbArticle){
                    console.log(dbArticle);
                })
                .catch(function(err){
                    console.log(err);
                });
        });

        res.send("scrape complete");
    });
});

app.get("/articles", function(req, res) {
    console.log("test");
    // Grab all the documents from the articles collections
    db.Article.find({}).then(function(dbArticle) {
        //If they are found send them to the server
        res.json(dbArticle);
    }).catch(function(err){
        //If theres an error send that to the server
        res.json(err);
    });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//Scrapping tools
var axios  = require("axios");
var cheerio = require("cheerio");

var PORT = 3000;

//Initialize Express
var app = express();

//Use morgan logger for logging requests
app.use(logger("dev"));
//Parse request body as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
//Make public a statuc folder
app.use(express.static(public));

//Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongonewsscrapper", {useNewUrlParse: true});

//Routes
app.get("/scrape/:subreddit", function(req, res){
    axios.get("http://www.reddit.com/r/" + req.params.subreddit).then(function(response){
        var $ = cheerio.load(response.data);

        $("").each(function(i, element){
            var result = {};

            //Save title

            //Save Link

            db.Article.create(result)
                .then(function(dbArticle){
                    console.log(dbArticle);
                })
                .catch(function(err){
                    console.log(err);
                });
        });

        res.send("Scrape Complete");
    });
});

app.get("/articles", function(req, res){
    db.Artcile.find({}, function(err, found){
        if (err) {
            console.log(err);
        } else {
            res.send(found);
        }
    });
});

app.get("articles/:id", function(req, res) {
    db.Article.findOne({_id: req.params.id}).populate("comment").then(function(dbLibrary){
        res.json(dbLibrary);
    }).catch(function(err){
        res.json(err);
    });
});

app.post("/artciles/:id", function(req ,res){
    db.Comment.create(req.body).then(function(dbComment){
        return db.Article.findOneAndUpdate({}, {$push: {comments: dbComment._id} }, {new: true}); 
    }).then(function(dbUser){
        res.json(dbUser);
    }).catch(function(err){
        res.json(err);
    });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
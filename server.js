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

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
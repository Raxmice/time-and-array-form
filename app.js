const express = require('express');
const bodyparser = require('body-parser');

const app = express();

var fnames=[];
var lnames=[];
//for EJS
app.set("view engine", "ejs");
//for body parser
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

//page req and res
app.get("/", function(req, res){
    var today = new Date();
    var currentday = today.getDay();
    var day = "";
    if(currentday <= 6 && currentday > 0){
        switch(currentday) {
            case 1:
                day = "Monday";
                break;
            case 2:
                day = "Tuesday";
                break;
            case 3:
                day = "Wednesday";
                break;
            case 4:
                day = "Thursday";
                break;
            case 5:
                day = "Friday";
                break;
            case 6:
                day = "Saturday";
        }
        var option = {
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        }
        var week = {
            weekday:"long"
        }
        var day = today.toLocaleDateString("en-US", option);
        var wday = today.toLocaleDateString("en-US", week);
        res.render("index", {thisday: day, weekday: wday});
    }else{
        var day = sunday;
        res.render("hollyday", {thisday: day});
        }
});
//form page
app.get("/form", function(req, res){
    res.render("form",{fname:fnames, lname:lnames});    
});
//for form printing
app.post("/form", function(req, res){
    var fname=req.body.fname;
    var lname=req.body.lname;
    fnames.push(fname);
    lnames.push(lname);
    res.redirect("form");
});

//calling a server
app.listen(3000, function(req, res){
    console.log("3000 port srever is activeted.");
});
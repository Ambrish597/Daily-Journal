//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose= require("mongoose");
const _=require("lodash");
const ejs = require("ejs");


mongoose.connect("mongodb://localhost:27017/postsDB", { useNewUrlParser: true , useUnifiedTopology: true});

const homeStartingContent = "Hello and Welcome to this simple Blog Website. Go ahead and compose blogs and have them rendered on the home screen.";
const aboutContent = "I am a third year Undergraduate Student at Heritage Institute of Technology, Kolkata. I have made this website simply using Nodejs and MongoDB to store the posts. I am an aspiring Web Developer and am honing my skills by creating such small projects. I have learnt Web Development using MERN and have also created another Note keeping Website using the same.";
const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

const postsSchema={
  title: String,
  body: String
};

const Post=mongoose.model("Post",postsSchema);

app.get("/",function(req,res) {

  Post.find({},function(err,foundPosts) {
    if(!err)
    {
      res.render("home",{text: homeStartingContent, posts: foundPosts});
    }
  });

  // console.log(posts);
});

app.get("/about", function(req,res) {
  res.render("about",{text: aboutContent});
});

app.get("/contact", function(req,res) {
  res.render("contact",{text: contactContent});
});

app.get("/compose", function(req,res) {
  res.render("compose");
});

app.get("/posts/:postId", function (req,res) {

  // console.log(req.params.post);
  // console.log(posts);
  const requestedPostId=req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){

    res.render("post", {
 
      title: post.title,
 
      body: post.body
 
    });
 
  });

});

app.post("/compose",function(req,res) {
  const post= new Post({
    title: req.body.newpost,
    body: req.body.postBody
  });
  // console.log(post);
  post.save(function(err) {
    if(!err)
      res.redirect("/");
  });
 
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});

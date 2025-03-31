const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
app.use(methodOverride('_method'))

const { v4: uuidv4} = require('uuid');

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect('mongodb://127.0.0.1:27017/pup')
  .then(() => console.log('Connected!'));

let posts = [
    {
        username : "tanish",
        content : "I love Nature",
        id : "aanb"
    },
    {
        username : "DEV mAlik",
        content : "Running is best for your health",
        id : uuidv4()
    },
    {
        username : "Ravi Singh",
        content : "I am an expert in MERN Stack",
        id : uuidv4()
    }
];

app.get("/posts", (req,res)=> {
    res.render("index.ejs",{posts});
})

app.get("/posts/new", (req,res)=> {
    res.render("new.ejs");
})

app.post("/posts", async (req,res)=>{
    let { username , content } = req.body;
    let id = uuidv4();
    await posts.push({username,content, id});
    res.redirect("/posts");
})

app.patch("/posts/:id", async (req,res)=>{
    let { id } = req.params;
    let newcontent = req.body.content;
    let post =await  posts.find((p) => id === p.id);
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
})

app.get("/posts/:id", async(req,res)=>{
    let { id } = req.params;
    let post = await posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", {post, id});
})

app.get("/posts/:id/edit", async (req,res)=>{
    let { id } = req.params;
    let post = await posts.find((p) => id === p.id);
    res.render("edit.ejs", {id, post});
})

app.delete("/posts/:id", async (req,res)=>{
    let { id } = req.params;
    posts = await posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})


app.listen(3000, ()=>{
    console.log("Listensss me");
})

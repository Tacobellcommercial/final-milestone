require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const ejs = require("ejs")

mongoose.connect("mongodb+srv://tacobellcommercial:" + process.env.PASSWORD + "@cluster0.nbvhnbi.mongodb.net/")


const bookListSchema = new mongoose.Schema({ 
    name: String, 
    author: String,
    pages: Number 
});

const BookList = mongoose.model('Booklist', bookListSchema);

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    text_content: String
})

const Contact = mongoose.model("Contact", contactSchema);

const app = express();



app.set("view engine", "ejs")
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.render("Home");
})

app.get("/gallery", async (req, res)=>{

    const results = await BookList.find({});

    res.render("Gallery", {bookList: results});

})

app.get("/contact", (req, res)=>{
    res.render("Contact");
})

app.get("/about-us", (req, res)=>{
    res.render("About");
})

app.post("/get-cart-item", async (req, res)=>{

    const result = await BookList.findOne({_id: req.body.mongoId});
    res.json({name: result.name, author: result.author, pages: result.pages})
})

app.post("/contact", async (req, res)=>{
    console.log(req.body);
    const newContactInfo = new Contact({
        name: req.body.name,
        email: req.body.email,
        text_content: req.body.text_content
    })

    await newContactInfo.save();

    res.redirect("/");

})

app.get("/subscribe", (req, res)=>{
    res.render("Subscribe");
})


app.listen(3000, ()=>{
    console.log("Listening on Port 3000");
})
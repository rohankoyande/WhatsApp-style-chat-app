const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const path = require("path");
const Chat = require("./models/chat.js")
const methodOverride = require("method-override");
const dayjs = require("dayjs");




//for ejs templeting
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));  //views folder
app.listen(port, () => {
  console.log("listening on port 8080");
});

app.use(express.static(path.join(__dirname,"public")));  //public folder

app.use(express.urlencoded({ extended: true})); //to parse

app.use(methodOverride("_method"));  //for PUT and DELETE methods

//npm i mongoose
main() 
 .then(() => {
    console.log("connection successful");
 })
 .catch((err) => console.log(err))
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


let chat1 = new Chat({
    from: "husky",
    to: "shiba",
    msg: "howl howl",
    created_at: new Date()
})

chat1.save()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });



app.get("/chats", async (req, res) => {
  let chatss = await Chat.find();
  res.render("index.ejs",{chatss, req, dayjs});
});


//new route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});


app.post("/chats", async (req, res) => {
  const { from, to, msg } = req.body;

  if (!from || !to || !msg) {
    return res.redirect("/chats/new?error=Please+fill+all+fields");
  }
  const newChat = new Chat({
    from,
    to,
    msg,
    created_at: new Date(),
  });
  try {
    await newChat.save();
    res.redirect("/chats?success=Chat+created+successfully");
  } catch (err) {
    console.log(err);
    res.redirect("/chats/new?error=Failed+to+save+chat");
  }
});



app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chaat = await Chat.findById(id);

  
  res.render("edit.ejs",{chaat});
});


//update
app.put("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updateChat = await Chat.findByIdAndUpdate(id,
        {msg: newMsg}, {runValidators: true, new: true}
    );
   res.redirect("/chats");
});



app.delete("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let deleteChat = await Chat.findByIdAndDelete(id);
        
   res.redirect("/chats");
});


app.use((req, res, next) => {    //middleware
  res.locals.req = req;
  next();  //continue to next middleware/route
});




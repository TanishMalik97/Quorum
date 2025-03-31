const mongoose = require("mongoose");
const chat = require("./models/chat.js");

mongoose.connect('mongodb://127.0.0.1:27017/pup')
  .then(() => console.log('Connected!'));

// let allchats = [
//     {
//     from : "21",
//     to : "malik",
//     msg : "hey boi , how r u doin man",
//     created_art : new Date(),
//   },
//   {
//     from : "69",
//     to : "maka",
//     msg : "hey man",
//     created_art : new Date(),
//   },
//   {
//     from : "96",
//     to : "fc",
//     msg : "hey boi ",
//     created_art : new Date(),
//   },
//   {
//     from : "561",
//     to : "rathi",
//     msg : "hey , ho r u ",
//   },
//   {
//     from : "1",
//     to : "bani",
//     msg : "whats up",
//   },
// ];
  
chat.insertMany(allchats);
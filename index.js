require("dotenv").config(); 
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connection = require("./DB");
connection();
require("./core/bot")


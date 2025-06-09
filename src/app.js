// 📁 server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {connectDB} = require("./config/database");

const app = express();
app.use(cors({
  origin : ["https://loquacious-pothos-34be6f.netlify.app", "http://localhost:5173"],
  credentials : true
}));
app.use(express.json());
app.use(cookieParser());

// Exporting all the routes
const {authRouter} = require("./Routes/authRoute");
const {eventRouter} = require("./Routes/eventRoute");
const {profileRouter} = require("./Routes/profileRoute");

app.use("/" , authRouter);
app.use("/" , eventRouter);
app.use("/" , profileRouter);

connectDB()
.then(() => {
  console.log("Database connected successfully");
  app.listen(3001, '0.0.0.0', () => console.log("Server running on port 3001"));
})
.catch((e) => {
  console.log(e)
})

// 📁 server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {connectDB} = require("./config/database");

const app = express();
app.use(cors({
  origin : ["https://gilded-cobbler-e599f9.netlify.app", "http://localhost:5173" , "https://pwa-3qil.vercel.app"],
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

const PORT = process.env.PORT || 3001
connectDB()
.then(() => {
  console.log("Database connected successfully");
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
})
.catch((e) => {
  console.log(e)
})

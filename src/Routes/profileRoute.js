const express = require("express");
const {authMiddleware} = require("../middlewares/auth")

const profileRouter = express.Router();

profileRouter.get("/profile/view" , authMiddleware , async (req , res) => {
  try{
    const user = req.user;
    res.send(user);
  } 
  catch(e) {
    res.status(401).send("ERROR" + e.message);
  }

})

module.exports = {profileRouter};
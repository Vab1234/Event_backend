const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User")

const authRouter = express.Router();

const SECRET = "secretkey";

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  res.send(user);
});

authRouter.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send("Invalid credentials");
        }
        const token = jwt.sign({ userId: user._id, email: user.email }, SECRET);
        console.log(user.name + " Logged in")
        res.cookie("token" , token , {
          sameSite : 'None',
          secure : true
        })
        res.send(user);
    }       
    catch(e){
        console.log(e)
        res.status(500).send("ERROR" + e.message);
    }
});

authRouter.post('/logout', (req, res) => {
  res.cookie("token" , null , {expires : new Date(Date.now())});
  res.send("User logged out")
});

module.exports = {authRouter};
const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required : true,
  },
  email: {
    type: String,
    required : true,
    unique : true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Enter a valid email Id")
      }
    }
  },
  password: {
    type: String,
    required : true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("This is not a string password!!Enter a strong password please")
      }
    }
  },
} , {timestamps : true});

module.exports = mongoose.model("User", userSchema);

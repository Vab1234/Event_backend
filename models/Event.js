const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  registeredUsers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
      email: String,
    },
  ],
  attendees: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String,
      email: String,
      markedAt: { type: Date, default: Date.now },
    },
  ],
});


module.exports = mongoose.model("Event" , eventSchema)
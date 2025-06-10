const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: {
    type: {
      type: String, // Must be 'Point'
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
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
  latitude : {
    type : String
  }
});


module.exports = mongoose.model("Event" , eventSchema)
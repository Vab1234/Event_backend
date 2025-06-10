const express = require("express");
const User = require("../../models/User");
const Event = require("../../models/Event");
const {generateQR} = require("../utils/qrGenerator");
const {authMiddleware} = require("../middlewares/auth");

const eventRouter = express.Router();

eventRouter.post("/event/create", async (req, res) => {
  try {
    const { name, date , location} = req.body;

    const event = await Event.create({ name, date, location});

    const qr = await generateQR(event._id.toString());

    res.send({
      eventId: event._id,
      name: event.name,
      qrCode: qr // base64 image
    }); 
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).send("Server error while creating event");
  }
});

eventRouter.post("/event/:eventId/register", authMiddleware, async (req, res) => {
  const { eventId } = req.params;
  const user = await User.findById(req.user.userId);
  const event = await Event.findById(eventId);

  if (!user || !event) return res.status(404).send("User or Event not found");

  try {
    const alreadyRegistered = event.registeredUsers.find(
      (u) => u.userId?.toString() === user._id.toString()
    );

    if (!alreadyRegistered) {
      event.registeredUsers.push({
        userId: user._id,
        name: user.name,
        email: user.email,
      });

      await event.save();
    }

    res.send("Registered successfully");
  } catch (e) {
    console.error("Error registering user:", e);
    res.status(500).send("ERROR: " + e.message); // ✅ Proper error message
  }
});


eventRouter.post("/event/mark-attendance-via-qr", authMiddleware, async (req, res) => {
  const { eventId, expiresAt } = req.body;
  const userId = req.user.userId;

  // Expiration Check
  if (new Date() > new Date(expiresAt)) {
    return res.status(410).send("QR Code expired");
  }

  try {
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) return res.status(404).send("Event or User not found");

    // Check if user is registered
    const isRegistered = event.registeredUsers.find(
      (u) => u.userId?.toString() === user._id.toString()
    );
    if (!isRegistered) return res.status(403).send("User not registered");

    // Check if already marked
    const alreadyMarked = event.attendees.find(
      (u) => u.userId?.toString() === user._id.toString()
    );
    if (alreadyMarked) return res.status(400).send("Attendance already marked");

    // Push to attendees
    event.attendees.push({
      userId: user._id,
      name: user.name,
      email: user.email,
    });

    await event.save();
    res.send("Attendance marked successfully");
  } catch (e) {
    console.error("Error marking attendance:", e);
    res.status(500).send("Internal Server Error");
  }
});

eventRouter.get("/event/map", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set to today's 00:00:00 for accurate filtering

    const events = await Event.find({
      date: { $gte: today }
    }).sort({ date: 1 }); // optional: sort by upcoming date

    res.json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    res.status(500).send("Server error");
  }
});

eventRouter.get("/events" , authMiddleware , async (req , res) => {
  try{
    const events = await Event.find();
    res.send(events);
  }
  catch(e){
    res.status(500).send("ERROR" + e.message);
  }
})

module.exports = {eventRouter};

const mongoose = require("mongoose");

const Schema = mongoose.Schema

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  label: { type: String, required: true },
  day: { type: String, required: true },
  id: { type: String, required: true },
});

module.exports = mongoose.model("Event", eventSchema);

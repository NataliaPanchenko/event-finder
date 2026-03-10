import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({
  category: { type: String, ref: "Category", required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  price: { type: Number, default: 0 },
  availableTickets: { type: Number, default: 0 },
  location: { type: String, ref: "Location", required: true },
});

const Event =
  mongoose.models.Events || mongoose.model("Event", eventSchema, "events");

export default Event;

import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  price: { type: Number, default: 0 },
  availableTickets: { type: Number, default: 0 },
  location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const Event =
  mongoose.models.Event || mongoose.model("Event", eventSchema, "events");

export default Event;

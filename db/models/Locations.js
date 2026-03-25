import mongoose from "mongoose";

const { Schema } = mongoose;

const locationSchema = new Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const Location =
  mongoose.models.Location ||
  mongoose.model("Location", locationSchema, "locations");

export default Location;

import mongoose from "mongoose";

const favoritesSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  { collection: "favorites" }
);

export default mongoose.models.Favorites ||
  mongoose.model("Favorites", favoritesSchema);

import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { collection: "cart" }
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);

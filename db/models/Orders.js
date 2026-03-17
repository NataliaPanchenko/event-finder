import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    items: [
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
    ],
    total: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "orders" }
);

export default mongoose.models.Orders || mongoose.model("Orders", ordersSchema);

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
    subtotal: {
      type: Number,
      required: true,
    },
    serviceFee: {
      type: Number,
      default: 0.001,
    },
    customer: {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  { collection: "orders", timestamps: true }
);

export default mongoose.models.Orders || mongoose.model("Orders", ordersSchema);

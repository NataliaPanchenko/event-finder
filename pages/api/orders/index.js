import dbConnect from "@/db/connect";
import Orders from "@/db/models/Orders";
import Event from "@/db/models/Events";
import requireAuth from "@/lib/auth";
import mongoose from "mongoose";

export default async function handler(request, response) {
  const session = await requireAuth(request, response);
  console.log(session);

  if (!session) {
    return response.status(401).json({ error: "Not authenticated" });
  }

  const userEmail = session.user.email;

  await dbConnect();

  if (request.method === "GET") {
    try {
      const orders = await Orders.find({ "customer.email": userEmail })
        .sort({ createdAt: -1 })
        .populate({
          path: "items.eventId",
          populate: [{ path: "location" }, { path: "category" }],
        });

      console.log("ORDERS FOR:", userEmail, orders);
      response.status(200).json(orders);
    } catch (error) {
      console.error("FETCH ORDERS ERROR:", error);
      response.status(500).json({ error: "Server error" });
    }
  }

  if (request.method === "POST") {
    try {
      const { items, customer, paymentMethod } = request.body;

      if (!Array.isArray(items) || items.length === 0) {
        return response.status(400).json({ error: "No items in order" });
      }
      let subtotal = 0;
      const eventsToUpdate = [];

      for (const item of items) {
        if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
          return response.status(400).json({
            error: "Wrong quantity",
          });
        }

        const event = await Event.findById(item.eventId);

        if (!event) {
          return response.status(404).json({ error: "Event not found" });
        }

        if (event.availableTickets < item.quantity) {
          return response.status(409).json({ error: "Not enough tickets" });
        }
        subtotal += event.price * item.quantity;
        eventsToUpdate.push({ event, quantity: item.quantity });
      }

      const serviceFeeRate = 0.001;
      const serviceFee = subtotal * serviceFeeRate;
      const total = subtotal + serviceFee;

      const order = await Orders.create({
        items,
        total,
        subtotal,
        serviceFeeRate,
        customer: { ...customer, email: userEmail },
        paymentMethod,
      });

      for (const { event, quantity } of eventsToUpdate) {
        event.availableTickets -= quantity;
        await event.save();
      }

      response.status(201).json(order);
    } catch (error) {
      console.error("ORDER ERROR:", error);
      response.status(500).json({ error: "Server error" });
    }
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}

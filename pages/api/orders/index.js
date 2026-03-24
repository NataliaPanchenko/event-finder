import dbConnect from "@/db/connect";
import Orders from "@/db/models/Orders";
import Event from "@/db/models/Events";
import requireAuth from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await requireAuth(request, response);

  if (!session) return;

  const userId = session.user.id;

  await dbConnect();

  if (request.method === "POST") {
    try {
      const { items, customer, paymentMethod } = request.body;

      if (!Array.isArray(items) || items.length === 0) {
        return response.status(400).json({ error: "No items" });
      }
      let total = 0;
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

        total += event.price * item.quantity;
        eventsToUpdate.push({ event, quantity: item.quantity });
      }

      const order = await Orders.create({
        userId,
        items,
        total,
        customer,
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

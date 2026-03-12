import dbConnect from "@/db/connect";
import CartItem from "@/db/models/CartItem";
import Event from "@/db/models/Events";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const items = await CartItem.find().lean();
      return response.status(200).json(items);
    } catch (error) {
      return response
        .status(500)
        .json({ status: "Error", message: error.message });
    }
  }

  if (request.method === "POST") {
    const { eventId, quantity } = request.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (quantity > event.availableTickets)
      return res.status(400).json({ message: "Not enough tickets" });
    const newItem = await CartItem.create({
      eventId,
      title: event.title,
      price: event.price,
      quantity,
      availableTickets: event.availableTickets,
    });
    return res.status(201).json(newItem);
  }

  return response.status(405).json({ message: "Method not allowed" });
}

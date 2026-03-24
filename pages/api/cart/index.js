import dbConnect from "@/db/connect";
import Cart from "@/db/models/Cart";
import Event from "@/db/models/Events";
import requireAuth from "@/lib/auth";

export default async function handler(request, response) {
  const session = await requireAuth(request, response);

  if (!session) return;

  await dbConnect();

  if (request.method === "GET") {
    try {
      const items = await Cart.find()
        .populate({
          path: "eventId",
          populate: { path: "category", model: "Category" },
        })
        .lean();
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
    if (!event)
      return response.status(404).json({ message: "Event not found" });
    if (quantity > event.availableTickets)
      return response.status(400).json({ message: "Not enough tickets" });

    const existingItem = await Cart.findOne({ eventId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return response.status(200).json(existingItem);
    }

    const newItem = await Cart.create({
      eventId,
      quantity,
    });

    return response.status(201).json(newItem);
  }

  if (request.method === "DELETE") {
    try {
      await Cart.deleteMany({});
      return response.status(200).json({ message: "Cart cleared" });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}

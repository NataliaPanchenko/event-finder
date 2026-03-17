import dbConnect from "@/db/connect";
import Orders from "@/db/models/Orders";
import Event from "@/db/models/Events";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const { items } = request.body;

      for (const item of items) {
        const updated = await Event.findOneAndUpdate(
          {
            _id: item.eventId,
            availableTickets: { $gte: item.quantity },
          },
          {
            $inc: { availableTickets: -item.quantity },
          },
          { new: true }
        );

        if (!updated) {
          throw new Error("Not enough tickets");
        }
      }

      const order = await Orders.create(request.body);
      response.status(201).json(order);
    } catch (error) {
      console.error("ORDER ERROR:", error);
      response.status(500).json({ error: error.message });
    }
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}

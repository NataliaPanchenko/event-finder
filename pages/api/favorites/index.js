import dbConnect from "@/db/connect";
import Favorites from "@/db/models/Favorites";
import Event from "@/db/models/Events";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const items = await Favorites.find()
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
    const { eventId } = request.body;

    const event = await Event.findById(eventId);
    if (!event)
      return response.status(404).json({ message: "Event not found" });

    const existingFavorite = await Favorites.findOne({ eventId });
    if (existingFavorite) {
      return response.status(200).json(existingFavorite);
    }

    const newFavorite = await Favorites.create({ eventId });
    return response.status(201).json(newFavorite);
  }

  return response.status(405).json({ message: "Method not allowed" });
}

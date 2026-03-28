import dbConnect from "@/db/connect";
import Favorites from "@/db/models/Favorites";
import Event from "@/db/models/Events";
import requireAuth from "@/lib/auth";

export default async function handler(request, response) {
  const session = await requireAuth(request, response);

  if (!session) {
    return response.status(401).json({ error: "Not authenticated" });
  }

  const userEmail = session.user.email;

  await dbConnect();

  if (request.method === "GET") {
    try {
      const items = await Favorites.find({ userEmail })
        .populate({
          path: "eventId",
          populate: [
            { path: "category", model: "Category" },
            { path: "location", model: "Location" },
          ],
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
    try {
      const { eventId } = request.body;

      const event = await Event.findById(eventId);
      if (!event)
        return response.status(404).json({ message: "Event not found" });

      const existingFavorite = await Favorites.findOne({ eventId, userEmail });
      if (existingFavorite) {
        return response.status(200).json(existingFavorite);
      }

      const newFavorite = await Favorites.create({ eventId, userEmail });
      return response.status(201).json(newFavorite);
    } catch (error) {
      return response.status(500).json({ status: "Error", message: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}

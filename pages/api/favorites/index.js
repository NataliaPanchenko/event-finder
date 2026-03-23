import dbConnect from "@/db/connect";
import Favorites from "@/db/models/Favorites";
import Event from "@/db/models/Events";
import { getSessionOrPreview } from "@/lib/preview-session";

export default async function handler(req, res) {
  const session = await getSessionOrPreview(req, res);

  if (!session) return res.status(401).json({ error: "Unauthorized" });

  await dbConnect();
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const query =
        session.id === "preview-user" ? {} : { userId: session.user?.id };

      const items = await Favorites.find(query)
        .populate({
          path: "eventId",
          populate: [
            { path: "category", model: "Category" },
            { path: "location", model: "Location" },
          ],
        })
        .lean();

      return res.status(200).json(items);
    }

    if (req.method === "POST") {
      const { eventId } = req.body;
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: "Event not found" });

      const query =
        session.id === "preview-user"
          ? { eventId }
          : { eventId, userId: session.user.id };
      const existingFavorite = await Favorites.findOne(query);
      if (existingFavorite) return res.status(200).json(existingFavorite);

      const newFavData =
        session.id === "preview-user"
          ? { eventId }
          : { eventId, userId: session.user.id };
      const newFavorite = await Favorites.create(newFavData);
      return res.status(201).json(newFavorite);
    }

    if (req.method === "DELETE") {
      const query =
        session.id === "preview-user"
          ? { eventId: id }
          : { eventId: id, userId: session.user.id };
      const deleted = await Favorites.findOneAndDelete(query);
      if (!deleted)
        return res.status(404).json({ error: "Favorite not found" });
      return res.status(200).json({ status: `Favorite ${id} deleted.` });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ status: "Error", message: error.message });
  }
}

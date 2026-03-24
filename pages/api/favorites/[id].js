import dbConnect from "@/db/connect";
import Favorites from "@/db/models/Favorites";

export default async function handler(request, response) {
  const session = await requireAuth(request, response);

  if (!session) return;

  await dbConnect();
  const { id } = request.query;

  if (request.method === "DELETE") {
    try {
      const deleted = await Favorites.findOneAndDelete({ eventId: id });

      if (!deleted) {
        return response.status(404).json({ error: "Favorite not found" });
      }

      return response.status(200).json({ status: `Favorite ${id} deleted.` });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  return response.status(405).json({ message: "Method not allowed" });
}

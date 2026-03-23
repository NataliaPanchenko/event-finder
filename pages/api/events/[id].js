import dbConnect from "@/db/connect";
import Event from "@/db/models/Events";
import Category from "@/db/models/Categories";
import Location from "@/db/models/Locations";
import requireAuth from "@/lib/auth";
import { getSessionOrPreview } from "@/lib/preview-session";

export default async function handler(request, response) {
  const session = await getSessionOrPreview(request, response);

  if (!session) return;

  await dbConnect();
  const { id } = request.query;
  if (request.method === "GET") {
    try {
      const event = await Event.findById(id).populate(["category", "location"]);
      if (!event) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(event);
    } catch (error) {
      return response
        .status(500)
        .json({ status: "Error", message: error.message });
    }
  } else {
    return response.status(405).json({ status: "Method Not Allowed" });
  }
}

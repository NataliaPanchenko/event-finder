import dbConnect from "@/db/connect";
import Event from "@/db/models/Events.js";
import Category from "@/db/models/Categories";
import Location from "@/db/models/Locations";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const events = await Event.find().populate(["category", "location"]);
      return response.status(200).json(events);
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  }
}

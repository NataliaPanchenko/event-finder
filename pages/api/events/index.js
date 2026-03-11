import dbConnect from "@/db/connect";
import Event from "@/db/models/Events.js";
import Category from "@/db/models/Categories";
import Location from "@/db/models/Locations";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const events = await Event.find().populate(["category", "location"]);
    return response.status(200).json(events);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}

import dbConnect from "@/db/connect";
import Event from "@/db/models/Events.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const events = await Event.find();
    return response.status(200).json(events);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}

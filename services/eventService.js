import dbConnect from "@/db/connect";
import Event from "@/db/models/Events";
import "@/db/models/Categories";
import "@/db/models/Locations";

export default async function getEventById(id) {
  await dbConnect();

  const event = await Event.findById(id)
    .populate(["category", "location"])
    .lean();

  if (!event) return null;

  event._id = event._id.toString();
  if (event.category?._id) event.category._id = event.category._id.toString();
  if (event.location?._id) event.location._id = event.location._id.toString();

  return event;
}

import dbConnect from "@/db/connect";
import Location from "@/db/models/Location";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const locations = await Location.find({});
      return response.status(200).json({ locations });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ error: "Method not allowed" });
  }
}

import dbConnect from "@/db/connect";
import Orders from "@/db/models/Orders";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const order = await Orders.create(request.body);
      response.status(201).json(order);
    } catch (error) {
      console.error("ORDER ERROR:", error);
      response.status(500).json({ error: error.message });
    }
  } else {
    response.status(405).json({ message: "Method not allowed" });
  }
}

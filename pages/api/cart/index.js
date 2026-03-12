import dbConnect from "@/db/connect";
import CartItem from "@/db/models/CartItem";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const items = await CartItem.find().lean();
      return response.status(200).json(items);
    } catch (error) {
      return response
        .status(500)
        .json({ status: "Error", message: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}

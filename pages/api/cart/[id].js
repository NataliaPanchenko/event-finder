import dbConnect from "@/db/connect";
import CartItem from "@/db/models/CartItem";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "DELETE") {
    const deleted = await CartItem.findByIdAndDelete(id);
    if (!deleted) return response.status(404).json({ error: "Item not found" });
    return response.status(200).json({ status: `CartItem ${id} deleted.` });
  }

  return response.status(405).json({ message: "Method not allowed" });
}

import dbConnect from "@/db/connect";
import Cart from "@/db/models/Cart";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "DELETE") {
    const deleted = await Cart.findByIdAndDelete(id);
    if (!deleted) return response.status(404).json({ error: "Item not found" });
    return response.status(200).json({ status: `Cart item ${id} deleted.` });
  }

  if (request.method === "PATCH") {
    const { quantity } = request.body;
    if (quantity < 1) {
      return response
        .status(400)
        .json({ message: "Quantity must be at least 1" });
    }

    const updated = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    return response.status(200).json(updated);
  }

  return response.status(405).json({ message: "Method not allowed" });
}

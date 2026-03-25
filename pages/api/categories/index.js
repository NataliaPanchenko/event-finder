import dbConnect from "@/db/connect";
import Category from "@/db/models/Categories";
import requireAuth from "@/lib/auth";

export default async function handler(request, response) {
  const session = await requireAuth(request, response);

  if (!session) return;

  try {
    await dbConnect();

    const categories = await Category.find().sort({ name: 1 });

    return response.status(200).json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return response.status(500).json({ error: "Failed to fetch categories" });
  }
}

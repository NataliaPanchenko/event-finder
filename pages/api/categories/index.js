import dbConnect from "@/db/connect";
import Category from "@/db/models/Categories";
import requireAuth from "@/lib/auth";
import { getSessionOrPreview } from "@/lib/preview-session";

export default async function handler(request, response) {
  const session = await getSessionOrPreview(request, response);

  if (!session) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  try {
    await dbConnect();

    const categories = await Category.find().sort({ name: 1 });

    response.status(200).json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    response.status(500).json({ error: "Failed to fetch categories" });
  }
}

import cloudinary from "@/lib/cloudinary";
import requireAuth from "@/lib/auth";

export default async function handler(request, response) {
  const session = await requireAuth(request, response);

  if (!session) return;

  if (request.method !== "POST") {
    return response.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { image } = request.body;

    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "events",
    });

    response.status(200).json({
      url: uploadedImage.secure_url,
    });
  } catch (error) {
    response.status(500).json({ error: "Upload failed" });
  }
}

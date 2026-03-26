import dbConnect from "@/db/connect";
import requireAuth from "@/lib/auth";

export default async function handler(req, res) {
  const session = await requireAuth(req, res);

  if (!session) {
    return response.status(401).json({ error: "Not authenticated" });
  }

  await dbConnect();

  if (req.method === "GET") {
    try {
      const user = {
        _id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        emailVerified: session.user.emailVerified || null,
      };

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

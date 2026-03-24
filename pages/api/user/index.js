import dbConnect from "@/db/connect";
import requireAuth from "@/lib/auth";

export default async function handler(req, res) {
  const session = await requireAuth(req, res);
  if (!session) return;

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

      res.status(200).json(user);
    } catch (error) {
      console.error("USER FETCH ERROR:", error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

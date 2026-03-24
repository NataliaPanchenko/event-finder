import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function requireAuth(request, response) {
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return null;
  }

  return session;
}

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getSessionOrPreview(request, response) {
  if (process.env.VERCEL_ENV === "preview") {
    return { user: { id: "preview-user" } };
  }
  return await getServerSession(request, response, authOptions);
}

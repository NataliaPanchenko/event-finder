import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loading from "./Loading";

const protectedPaths = ["/profile", "/cart", "/favorites"];

export default function ProtectedRoute({ children }) {
  const { status } = useSession();
  const router = useRouter();

  const isProtected = protectedPaths.includes(router.pathname);

  if (!isProtected) {
    return children;
  }

  if (status === "loading") return <Loading />;

  if (status === "unauthenticated" && router.pathname !== "/login") {
    router.push("/login");
    return null;
  }

  return children;
}

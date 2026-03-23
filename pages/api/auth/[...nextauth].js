import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";

const isPreview = process.env.VERCEL_ENV === "preview";

export const authOptions = {
  adapter: isPreview ? undefined : MongoDBAdapter(clientPromise),

  providers: isPreview
    ? [
        CredentialsProvider({
          name: "credentials",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "username",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            if (
              credentials.username === "fisch" &&
              credentials.password === "fisch"
            ) {
              return {
                id: "a1b2c3d4",
                name: "Neuer Fisch",
                email: "test@example.com",
              };
            }
            return null;
          },
        }),
      ]
    : [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          allowDangerousEmailAccountLinking: true,
        }),
        GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
          allowDangerousEmailAccountLinking: true,
        }),
      ],

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log("PROFILE:", profile);
      return true;
    },
  },
};

export default NextAuth(authOptions);

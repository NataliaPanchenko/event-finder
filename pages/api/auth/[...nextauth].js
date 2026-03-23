import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers:
    process.env.VERCEL_ENV === "preview"
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
              console.log(credentials);
              if (
                credentials.username === "fisch" &&
                credentials.password === "fisch123!@#"
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
    async session({ session, token, user }) {
      console.log(session, token, user);
      return session;
    },
  },
};

export default NextAuth(authOptions);

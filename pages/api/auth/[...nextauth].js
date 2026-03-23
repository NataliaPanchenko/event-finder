import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/db";

const isPreview = process.env.VERCEL_ENV === "preview";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: isPreview
    ? [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "username",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            const client = await clientPromise;
            const db = client.db();
            const users = db.collection("users");

            // ищем пользователя в базе
            let user = await users.findOne({ email: "test@example.com" });

            // если нет — создаём dummy пользователя
            if (!user) {
              const result = await users.insertOne({
                name: "Neuer Fisch",
                email: "test@example.com",
                username: credentials.username,
                createdAt: new Date(),
              });
              user = {
                _id: result.insertedId,
                name: "Neuer Fisch",
                email: "test@example.com",
              };
            }

            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
            };
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
      if (session.user) session.user.id = user.id;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from "next-auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        // This is a mock authentication.
        // In a real application, you would validate credentials against a database.
        if (
          credentials?.email === "test@example.com" &&
          credentials?.password === "password"
        ) {
          // Any object returned will be saved in `user` property of the JWT
          const user = { id: "1", name: "Demo User", email: "test@example.com" };
          return user;
        } else {
          // If you return null then an error will be displayed to the user
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth',
  },
})

export { handler as GET, handler as POST }

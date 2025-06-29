import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows redirecting to the onboarding flow after sign-in
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // Allows relative callback URLs
      if (url.startsWith("/")) {
        return new URL(url, baseUrl).toString();
      }
      return baseUrl;
    }
  }
})

export { handler as GET, handler as POST }

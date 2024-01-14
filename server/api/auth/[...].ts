import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { user } from "../../models/User.model";

async function getUser(id: string) {
  const User = await user.findById(id);

  return User?.toJSON();
}

export default NuxtAuthHandler({
  secret: useRuntimeConfig().auth.secret,

  pages: {
      signIn: '/auth/signin'
  },
 
  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: "credentials",
      origin: useRuntimeConfig().auth.origin,
      async authorize(credential: { email: string; password: string }) {
        // Authorize the user

        const User = await user.findOne({ email: credential.email }).select("+password");

        if (!User) {
          return null;
        }

        const isValid = await user.findOne({password: credential.password});
        console.log('auth ', isValid);
        if (!isValid) {
          return null;
        }  

        return User.toJSON();
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      return token;
    },

    async session({ session, token }) {
      // @ts-expect-error
      const refreshedUser = await getUser(token._id);

      session.user = {
        ...token,
        ...session.user,
        ...refreshedUser,
      };

      return session;
    },
  },
});

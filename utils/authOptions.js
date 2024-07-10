import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
export const authOptions = {
    // Configure one or more authentication providers
    adapter: DrizzleAdapter(db),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id;
            return { session, user };
        },
    },
};

import { AuthOptions } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { logger } from "./logger";

const auth: AuthOptions = {
	pages: { signIn: "/auth/login" },
	session: { strategy: "jwt" },
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: any, _req) {
				logger.info(
					`User <${credentials["username"]}> tried logging in.`,
				);
				let user: any = null;
				if (
					credentials.username == "user" &&
					credentials.password == "user"
					// credentials.password == "39JK3!ns#025"
				) {
					user = { id: "1", name: "admin" };
				}
				return user;
			},
		}),
	],
	callbacks: {
		jwt({ token, trigger, session, user }) {
			if (trigger === "update") {
				if (session.user) {
					token.name = session.user.userid;
				}
				if (session.locale) {
					token.user.locale = session.locale;
				}
			}
			if (trigger === "signIn") {
				token.user = user;
			}
			return token;
		},
		session: async ({
			session,
			token,
		}: {
			session: Session;
			token: JWT;
		}) => {
			session.user = token.user;
			return session;
		},
	},
};

export default auth;

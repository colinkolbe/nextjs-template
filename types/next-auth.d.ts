// eslint-disable-next-line no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
	interface Session {
		refreshTokenExpires?: number;
		accessTokenExpires?: string;
		refreshToken?: string;
		token?: string;
		error?: string;
		user?: User;
	}

	interface User {
		username: string;
		userId: number;
		locale?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		refreshTokenExpires?: number;
		accessTokenExpires?: number;
		refreshToken?: string;
		token: string;
		exp?: number;
		iat?: number;
		jti?: string;
		user?: User;
	}
}

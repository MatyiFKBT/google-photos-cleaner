/// <reference types="next-auth" />
import NextAuth, { DefaultSession, JWT } from "next-auth"

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session extends DefaultSession {
		user: {
			isAdmin: boolean
			role: string //'USER' | 'ADMIN'
			id: string
			name: string
			username: string
			email: string
		}
		version: string
		message?: string
		access_token?: string
	}
}
declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		isAdmin: boolean
		role: string //'USER' | 'ADMIN'
		id: string
		username: string
		version: string
		access_token?: string
	}
}
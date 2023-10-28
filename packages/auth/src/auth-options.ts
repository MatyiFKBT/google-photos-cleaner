import { prisma } from '@luego/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { verify } from 'argon2'
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { z } from 'zod'
import packageJSON from 'package.json'
export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(15),
})

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'email', type: 'email', value: 'matyi@gmail.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const creds = await loginSchema.parseAsync(credentials)

				const user = await prisma.user.findUnique({
					where: {
						email: creds.email,
					},
				})
				if (!user || !user.hashed_password)
					return null

				const isValidPassword = await verify(user.hashed_password, creds.password)
				if (!isValidPassword)
					return null

				return {
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					username: user.username,
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					scope: "openid email profile https://www.googleapis.com/auth/photoslibrary"
				}
			}
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (account?.access_token) {
				token.access_token = account.access_token;
			}
			if (user) {
				// check if user is admin
				const user_exists = await prisma.user.findUnique({
					where: {
						id: user.id,
					},
				})
				if (user_exists) {
					token.role = user_exists.role
					token.isAdmin = user_exists.role === 'ADMIN'
					token.id = user_exists.id
					token.username = user_exists.username!
					token.version = packageJSON.version
				}
			}
			return token
		},
		async session({ session, token }) {
			if ((!token.version) || token.version && (token.version !== packageJSON.version)) {
				// session.user = session.user
				session.message = 'A verzió eltér, kérlek jelentkezz be újra'
			}
			if (session.user) {
				session.user.role = token.role
				session.user.isAdmin = token.isAdmin
				session.user.id = token.id
				session.user.username = token.username
				session.version = token.version
			}
			if (token.access_token) {
				session.access_token = token.access_token
			}
			return session
		},
	},
}
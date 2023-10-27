import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import FormItem from "@/components/ui/formitem"
import { useZodForm } from "@/utils/form/useZodForm"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/router"
import { z } from "zod"

function Login() {
	const router = useRouter()
	const loginForm = useZodForm({
		schema: z.object({
			email: z.string().email(),
			password: z.string().min(6),
		}),
	})

	return (
		<Layout>
				<h1>Login</h1>
				<form
					onSubmit={loginForm.handleSubmit(async (values) => {
						const result = await signIn('credentials', {
							redirect: false,
							email: values.email,
							password: values.password,
							callbackUrl: router.query.callbackUrl as string || '/dash',
						})
						if (result!.error) {
							loginForm.setError('password', { type: 'manual', message: 'failed to login' })
						}
						// if (result?.ok) {
						// 	log.debug('User logged in', { email: values.email })
						// 	LogRocket.identify(values.email)
						// }
					})}
					className="flex flex-col gap-4"
				>
					<FormItem label="email" text="email" methods={loginForm} type="email" />
					<FormItem label="password" text="password" methods={loginForm} type="password" />

					<div className="flex gap-4 mt-2">
						<Button type="submit" size="lg">
							{loginForm.formState.isSubmitting && <span className="animate-spin mr-2">⏳</span>}
							Login</Button>
					</div>
				</form>

		</Layout>
	)
}


export default Login
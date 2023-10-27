import { trpc } from '@/utils/trpc'
import { useState } from 'react'
import FormItem from '../ui/formitem'
import { useZodForm } from '@/utils/form/useZodForm'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Post } from '@/../../packages/db'
import { RouterOutput } from '@/../../packages/api/src/trpc'
export default function DashboardAddItem() {
	const utils = trpc.useContext()
	const { mutate } = trpc.post.addPost.useMutation({
		onSuccess(data, variables, context) {
			console.log('onSuccess', { data, variables, context })
			utils.post.getAllPosts.invalidate()
		},
	})

	const textForm = useZodForm({
		schema: z.object({
			text: z.string()
		})
	})

	return (
		<div className='border-white border-2 p-2'>
			<p className='mb-2 text-lg'>
				DashboardAddItem
			</p>

			<form
				onSubmit={
					textForm.handleSubmit(async (values) => {
						await mutate(values)
					})
				}
				className='flex flex-col gap-4'
			>

				<FormItem label='text' text='text' methods={textForm} type='text' />
				<Button type='submit' size='sm'> Add</Button>
			</form>
		</div>
	)
}

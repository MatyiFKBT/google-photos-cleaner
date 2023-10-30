import { useZodForm } from '@/utils/form/useZodForm'
import { trpc } from '@/utils/trpc'
import { z } from 'zod'
import { Button } from '../ui/button'
import FormItem from '../ui/formitem'
export default function DashboardAddItem() {
	const { mutate } = trpc.photos.createAlbum.useMutation({
		onSuccess(data, variables, context) {
			console.log('onSuccess', { data, variables, context })
		},
	})

	const textForm = useZodForm({
		schema: z.object({
			title: z.string()
		})
	})

	return (
		<div className='border-white border-2 p-2'>
			<p className='mb-2 text-lg'>
				Create a new album
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
				<Button type='submit' size='sm'> Create Album</Button>
			</form>
		</div>
	)
}

import { trpc } from '@/utils/trpc'
import React from 'react'

function SecretComponent() {
	const {
		data, isLoading, error,
	} = trpc.secret.useQuery()
	return (
		<div>
			{isLoading && <div>Loading secret info...</div>}
			{error && <div>{error.message}</div>}
			{data && <div>{data.secret}</div>}
		</div>
	)
}

export default SecretComponent
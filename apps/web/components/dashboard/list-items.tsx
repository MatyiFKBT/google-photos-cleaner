import { trpc } from '@/utils/trpc'
import React from 'react'

export default function DashboardListItems() {
	const { data, isLoading, error } = trpc.post.getAllPosts.useQuery()

	return (
		<div className="border-2 border-white p-2">
			<p className="mb-2 text-lg">
				DashboardListItems
			</p>
			{isLoading && <div>Loading...</div>}
			{error && <div>{error.message}</div>}
			{data && <div>
				<details className="mb-2"> 

					<summary>data as json</summary>
					<pre>
						{JSON.stringify(data, null, 2)}
					</pre>
				</details>
				{data.map((post) => (
					<div key={post.id}>
						<p><span className="font-semibold">{post.user.name}</span>: {post.text}</p>
					</div>
				))}
			</div>}
		</div>
	)
}

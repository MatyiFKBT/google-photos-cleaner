import { trpc } from '@/utils/trpc'
import React from 'react'

export default function DashboardListItems() {
	const { data, isLoading, error } = trpc.photos.getAlbums.useQuery()

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
				<div className="flex">

					{data.map((item) => (
						<div key={item.id}>
							<img src={item.baseUrl} />
						</div>
					))}
				</div>
			</div>}
		</div>
	)
}

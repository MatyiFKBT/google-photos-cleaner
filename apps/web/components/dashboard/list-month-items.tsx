import { trpc } from '@/utils/trpc'
import React from 'react'

export default function DashboardListMonthItems() {
	const { data, isLoading, error } = trpc.photos.getScreenshots.useQuery()

	return (
		<div className="border-2 border-white p-2">
			<p className="mb-2 text-lg">
				DashboardListMonthItems
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
				<div className=" grid grid-cols-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1.5 ">

					{data.mediaItems
						.map((item) => (
							<div key={item.id}>
								<img className="border-yellow-500 border-8" src={item.baseUrl} />
							</div>
						))}
				</div>
			</div>}
		</div>
	)
}

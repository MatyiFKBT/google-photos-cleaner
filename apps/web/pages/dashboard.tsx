import React from 'react'
import { Layout } from '@/components/layout'
import DashboardAddItem from '@/components/dashboard/new-item'
import DashboardListItems from '@/components/dashboard/list-items'
import DashboardListMonthItems from '@/components/dashboard/list-month-items'


function Dashboard() {
	return (
		<Layout>
			<h1>
				Dashboard
			</h1>
			<DashboardListItems />
			<DashboardListMonthItems />
			<DashboardAddItem />
		</Layout>

	)
}


export default Dashboard
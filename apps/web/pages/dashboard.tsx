import React from 'react'
import { trpc } from '../utils/trpc'
import { Layout } from '@/components/layout'
import DashboardAddItem from '@/components/dashboard/new-item'
import DashboardListItems from '@/components/dashboard/list-items'


// TODO: revamp this page

function Dashboard() {
	return (
		<Layout>
			<h1>

				Dashboard
			</h1>
			<DashboardListItems />
			<DashboardAddItem />
		</Layout>

	)
}


export default Dashboard
import React from 'react'
import { trpc } from '../utils/trpc'
import { Layout } from '@/components/layout'
import SecretComponent from '@/components/secret'
import DashboardAddItem from '@/components/dashboard/new-item'
import DashboardListItems from '@/components/dashboard/list-items'

function Dashboard() {
	return (
		<Layout>
			<h1>

				Dashboard
			</h1>
			<DashboardListItems />
			<DashboardAddItem />
			<SecretComponent />
		</Layout>

	)
}


export default Dashboard
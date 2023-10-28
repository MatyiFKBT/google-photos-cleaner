import { z } from "zod";
import { authProcedure, router } from "../trpc";

async function usePhotosAPI(props: {access_token: string,url: string, init?: RequestInit, body?: any}) {
	const response = await fetch(props.url, {
		headers: {
			'Authorization': `Bearer ${props.access_token}`
		},
		body: JSON.stringify(props.body),
		...props.init
	})
	console.log({response})
	const json = await response.json()
	console.log({json})
	return json as { mediaItems: { id: string, baseUrl: string }[]}
}


export const photoRouter = router({
	getMonthlyPhotos: authProcedure.query(async ({ ctx }) => {
		const response = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems', {
			headers: {
				'Authorization': `Bearer ${ctx.session.access_token}`
			}
		})
		const json = await response.json()
		return json.mediaItems as { id: string, baseUrl: string }[]
	}),
	getScreenshots: authProcedure.query(async ({ ctx }) => {
		console.log(ctx.session.access_token)
		const response = await usePhotosAPI({
			access_token: ctx.session.access_token,
			url: 'https://photoslibrary.googleapis.com/v1/mediaItems:search',
			init: {
				method: 'POST'
			},
			body: {
				filters: {
					contentFilter: {
						includedContentCategories: [
							'SCREENSHOTS'
						]
					}
				}
			}
		})
		console.log(response)
		return response
	}),
	getThisMonth: authProcedure.query(async ({ ctx }) => {
		const response = await usePhotosAPI({
			access_token: ctx.session.access_token,
			url: 'https://photoslibrary.googleapis.com/v1/mediaItems:search',
			init: {
				method: 'POST'
			},
			body: {
				filters: {
					dateFilter: {
						ranges: [
							{
								startDate: {
									year: new Date().getFullYear(),
									month: new Date().getMonth() + 1,
									day: 1
								},
								endDate: {
									year: new Date().getFullYear(),
									month: new Date().getMonth() + 1,
									day: new Date().getDate()
								}
							}
						]
					}
				}
			}
		})
		console.log(response)
		return response
	}),
	createAlbum: authProcedure
	.input(z.object({title: z.string()}))
	.mutation(async ({ ctx, input }) => {
		const response = await usePhotosAPI({
			access_token: ctx.session.access_token,
			url: 'https://photoslibrary.googleapis.com/v1/albums',
			init: {
				method: 'POST'
			},
			body: {
				album: {
					title: input.title
				}
			}
		})
		return response
	})
});
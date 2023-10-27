import { google } from "googleapis";
import { authProcedure, router } from "../trpc";

google.api
export const photoRouter = router({
	getAlbums: authProcedure.query(async ({ ctx }) => {
		const response = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems', {
			headers: {
				'Authorization': `Bearer ${ctx.session.access_token}`
			}
		})
		const json = await response.json()
		return json.mediaItems as { id: string, baseUrl: string }[]
	}),
});
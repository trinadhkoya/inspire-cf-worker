/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import {menus} from "./locations";
import { featured } from './content_catalog';

export default {
	async fetch(request) {
		const url = new URL(request.url);
		const locationId = url.searchParams.get("location"); // Get locationId from query params

		// Sample menu JSON mapped by locationId
		if (url.pathname === "/featured") {
			// Handle the new endpoint
			return new Response(
				JSON.stringify(featured),
				{ status: 200, headers: { "Content-Type": "application/json" } }
			);
		}

		const menuData = menus[Number(locationId)];

		if (!locationId||!menus[Number(locationId)]) {
			return new Response(
				JSON.stringify({error: "Menu not found for this location"}),
				{status: 404, headers: {"Content-Type": "application/json"}}
			);
		}

		return new Response(JSON.stringify(menuData), {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*", // CORS support
			},
		});
	},
};

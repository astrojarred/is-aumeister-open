import * as cheerio from 'cheerio';

import { EmbedBuilder, WebhookClient } from 'discord.js';
import { error, json } from '@sveltejs/kit';

import { DISCORD_WEBHOOK_URL } from '$env/static/private';
import fetch from 'node-fetch';

const URL = 'https://www.aumeister.de/willkommen/';

const webhookClient = new WebhookClient({ url: DISCORD_WEBHOOK_URL });

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		const openResponse = await fetch(URL);
		const html = await openResponse.text();
		const $ = cheerio.load(html);
		const targetElement = $('div#c769 p.text-center');
		const extractedText = targetElement.text();

		let isOpen = extractedText.includes('öffnet');
		let butTomorrow = extractedText.includes('öffnet morgen');

		let title;

		if (isOpen) {
			if (butTomorrow) {
				title = 'Aumeister is CLOSED today (but open tomorrow!)';
				isOpen = false;
			} else {
				title = '🍻 Aumeister is OPEN today!';
			}
		} else {
			title = 'Aumeister is CLOSED today.';
		}

		const color = isOpen ? 3066993 : 15158332;

		const embed = new EmbedBuilder()
			.setTitle(title)
			.setDescription(extractedText)
			.setColor(color)
			.setURL('http://isaumeisteropen.com.de')
			.setTimestamp(new Date());

		webhookClient.send({
			embeds: [embed]
		});

		return json({ open: isOpen, butTomorrow: butTomorrow, message: extractedText, note: title });
	} catch (err) {
		console.error('Error:', err);
		throw error(500, 'Error fetching from the aumeister website.');
	}
}

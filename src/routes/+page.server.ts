import * as cheerio from 'cheerio';

import { error } from '@sveltejs/kit';
import fetch from 'node-fetch';

const URL = 'https://www.aumeister.de/willkommen/';

/** @type {import('./$types').PageLoad} */
export async function load() {
	try {
        let isOpen;
		const response = await fetch(URL);
		const html = await response.text();
		const $ = cheerio.load(html);
		const targetElement = $('div#c769 p.text-center');
		const extractedText = targetElement.text();

		if (extractedText) {
			isOpen = extractedText.includes('öffnet');
		}
        else {
            throw error(500, 'Error fetching from the aumeister website.')
        }

		return { message: extractedText, open: isOpen };
	} catch (e) {
		console.log('ERROR');
		console.log(e);
		// raise error
		throw { status: 500, error: new Error('There was an issue.') };
	}
}

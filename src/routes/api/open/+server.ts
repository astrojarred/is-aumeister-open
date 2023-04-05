import * as cheerio from 'cheerio';

import { error, json } from '@sveltejs/kit';

import fetch from 'node-fetch';

const URL = "https://www.aumeister.de/willkommen/"
//const URL = "https://web.archive.org/web/20220714005455/https://www.aumeister.de/willkommen/"

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    const response = await fetch(URL);
    const html = await response.text();
    const $ = cheerio.load(html);
    const targetElement = $('div#c769 p.text-center');
    const extractedText = targetElement.text();

    const isOpen = extractedText.includes("geöffnet")


    return json({message: extractedText, open: isOpen});
  } catch (err) {
    console.error('Error fetching and parsing HTML:', err);
    throw error(500, 'Error fetching from the aumeister website.')
  }
}

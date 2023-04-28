<script lang="ts">
	import { fade } from 'svelte/transition';
	import langStore from '../Store'

	export let data;

	$: lang = $langStore;


	const localizationDict = {
		en: {
			yes: '🍻YES.',
			no: 'NO.',
			moreInfo: 'More Info',
			website: 'Aumeister Website',
			hideMenu: 'Hide Menu',
			stickMenu: 'Stick Menu',
			fromWebsite: 'From the website',
			attention: 'Attention',
			thisCouldChange: 'This could change around 10 AM!',
			openTomorrow: 'But it will be open tomorrow!'
		},
		de: {
			yes: '🍻JA.',
			no: 'NEIN.',
			moreInfo: 'Mehr Info',
			website: 'Aumeister Webseite',
			hideMenu: 'Menü verstecken',
			stickMenu: 'Menü festhalten',
			fromWebsite: 'Von der Webseite',
			attention: 'Achtung',
			thisCouldChange: 'Dies könnte sich gegen 10 Uhr ändern!',
			openTomorrow: 'Aber morgen wird es geöffnet sein!'
		}
	};

	const germanyTimeZone = 'Europe/Berlin';
	const now = new Date();
	const germanyTime = new Date(now.toLocaleString('en-US', { timeZone: germanyTimeZone }));

	// Calculate the difference between local time and Germany time in milliseconds
	const offset = germanyTime.getTime() - now.getTime();

	// Add the offset to the current local time to get the Germany time as a Date object
	const germanyDate = new Date(now.getTime() + offset);

	const updatingSoon = germanyDate.getHours() < 11;

	let hideMenu = false;
	let menuHovered = false;
	let menuYposition = 0.0;

	function handleMouseMove(event: MouseEvent) {
		menuYposition = window.innerHeight - event.clientY;
		menuHovered = menuYposition < 150;
	}

	function setLang(newLang: string) {
		langStore.set(newLang);
	}

</script>

{#if data}
	<div class="h-screen flex flex-col items-center justify-center">
		<h1 class="text-7xl">
			{data?.open ? localizationDict[lang].yes : localizationDict[lang].no}
		</h1>
		{#if data?.butTomorrow}
		<h3 class="text-md sm:text-2xl mt-2">
			👀&nbsp;{localizationDict[lang].openTomorrow}
		</h3>
		{/if}
		{#if updatingSoon}
			<div class="alert alert-info max-w-sm lg:max-w-lg mx-5 mt-5">
				<svg
					width="48"
					height="48"
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 34C22.9 34 22 33.1 22 32V24C22 22.9 22.9 22 24 22C25.1 22 26 22.9 26 24V32C26 33.1 25.1 34 24 34ZM26 18H22V14H26V18Z"
						fill="#0085FF"
					/>
				</svg>
				<div class="flex flex-col">
					<span>{localizationDict[lang].attention}</span>
					<span class="text-content2">{localizationDict[lang].thisCouldChange}</span>
				</div>
			</div>
		{/if}
		<div
			class="fixed bottom-0 w-full mb-6 pt-40 opacity-50 hover:opacity-80 transition-opacity"
			on:mousemove={handleMouseMove}
		>
			{#if !hideMenu || menuHovered}
				<div class="flex flex-col items-end sm:items-center sm:flex-row sm:align-middle sm:justify-center mt-5 gap-2 mx-4 md:gap-4" transition:fade>
					<label class="btn btn-sm sm:btn-md btn-solid-primary" for="modal-1">{localizationDict[lang].moreInfo}</label>
					<div
						class="btn btn-sm sm:btn-md btn-solid-primary"
						on:click={() => {
							window.open('https://www.aumeister.de/willkommen/', '_blank');
						}}
						on:keydown={() => {
							window.open('https://www.aumeister.de/willkommen/', '_blank');
						}}
					>
						{localizationDict[lang].website}
					</div>
					{#if lang === "en"}
						<div class="btn btn-sm sm:btn-md btn-solid-primary" on:click={() => setLang('de')} on:keydown={() => setLang('de')}>
							DE
						</div>
					{:else}
						<div class="btn btn-sm sm:btn-md btn-solid-primary" on:click={() => setLang('en')} on:keydown={() => setLang('en')}>
							EN
						</div>
					{/if}
					{#if !hideMenu}
						<div
							class="btn btn-sm sm:btn-md btn-solid-primary"
							on:click={() => (hideMenu = true)}
							on:keydown={() => (hideMenu = true)}
						>
							{localizationDict[lang].hideMenu}
						</div>
					{:else}
						<div
							class="btn btn-sm sm:btn-md btn-solid-primary"
							on:click={() => (hideMenu = false)}
							on:keydown={() => (hideMenu = false)}
						>
							{localizationDict[lang].stickMenu}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
	<input class="modal-state" id="modal-1" type="checkbox" />
	<div class="modal">
		<label class="modal-overlay" for="modal-1" />
		<div class="modal-content flex flex-col gap-5">
			<label for="modal-1" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
			<h2 class="text-xl">{localizationDict[lang].fromWebsite}:</h2>
			<span>{data.message}</span>
		</div>
	</div>
{:else}
	<div class="h-screen flex items-center justify-center">
		<h1 class="text-7xl">Loading...</h1>
	</div>
{/if}

<script>
	export let data;
	console.log(data.message);

	const germanyTimeZone = 'Europe/Berlin';
	const now = new Date();
	const germanyTime = new Date(now.toLocaleString('en-US', { timeZone: germanyTimeZone }));

	// Calculate the difference between local time and Germany time in milliseconds
	const offset = germanyTime.getTime() - now.getTime();

	// Add the offset to the current local time to get the Germany time as a Date object
	const germanyDate = new Date(now.getTime() + offset);

	const updatingSoon = germanyDate.getHours() < 11;
	//const updatingSoon = true;

</script>

{#if data}
	<div class="h-screen flex flex-col items-center justify-center">
		<h1 class="text-7xl">
			{data?.open ? '🍻YES.' : 'NO.'}
		</h1>
		{#if updatingSoon}
			<div class="alert alert-info lg:max-w-lg mx-5 mt-5">
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
					<span>Attention</span>
					<span class="text-content2">This could change around 10 AM!</span>
				</div>
			</div>
		{/if}
		<div class="flex flex-row items-center justify-center mt-5 gap-4">
			<label class="btn btn-solid-primary" for="modal-1">More Info</label>
			<div
				class="btn btn-solid-primary"
				on:click={() => {
					window.open('https://www.aumeister.de/willkommen/', '_blank');
				}}
				on:keydown={() => {
					window.open('https://www.aumeister.de/willkommen/', '_blank');
				}}
			>
				Aumeister Website
			</div>
		</div>
	</div>
	<input class="modal-state" id="modal-1" type="checkbox" />
	<div class="modal">
		<label class="modal-overlay" for="modal-1" />
		<div class="modal-content flex flex-col gap-5">
			<label for="modal-1" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
			<h2 class="text-xl">From the website:</h2>
			<span>{data.message}</span>
		</div>
	</div>
{:else}
	<div class="h-screen flex items-center justify-center">
		<h1 class="text-7xl">Loading...</h1>
	</div>
{/if}

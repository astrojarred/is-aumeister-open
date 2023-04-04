<script>
	import { update_await_block_branch } from 'svelte/internal';


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

    console.log('Current time in Germany:', germanyDate.getTime(), updatingSoon);

	let showDetails = false;
</script>

{#if data}
	<div class="h-screen flex flex-col items-center justify-center">
		<div class="cursor-pointer"
			on:click={() => {
				showDetails = !showDetails;
			}}
			on:keypress={() => {
				showDetails = !showDetails;
			}}
		>
			<h1 class="text-7xl">
				{data?.open ? '🍻YES.' : 'NO.'}
			</h1>
		</div>
        {#if updatingSoon}
            <p class="text-lg mx-5 lg:max-w-lg text-red-300">Attention: This could change around 10 or 11AM!</p>
        {/if}
        {#if showDetails}
        <p class="text-lg mx-5 lg:max-w-lg">{data.message}</p>
        {/if}
	</div>
{:else}
	<div class="h-screen flex items-center justify-center">
		<h1 class="text-7xl">Loading...</h1>
	</div>
{/if}

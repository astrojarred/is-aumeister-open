<script>
	export let data;
	console.log(data.message);

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
				{data?.open ? 'YES.' : 'NO.'}
			</h1>
		</div>
        {#if showDetails}
        <p class="text-lg mx-5 lg:max-w-lg">{data.message}</p>
        {/if}
	</div>
{:else}
	<div class="h-screen flex items-center justify-center">
		<h1 class="text-7xl">Loading...</h1>
	</div>
{/if}

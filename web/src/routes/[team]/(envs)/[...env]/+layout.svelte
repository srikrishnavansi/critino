<script lang="ts">
	import Nav from '$lib/components/ui/nav.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Typography } from '$lib/components/ui/typography';
	import { primaryRoutes } from './routes';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button';
	import { Breadcrumb } from '$lib/components/ui/breadcrumb';

	export let data;

	$: ({ authenticated, team, environment, environments: allEnvironments, critiques } = data);

	$: environments = allEnvironments.filter((env) => env.parent_name === environment.name);

	let newKey = '';

	$: console.log('authenticated', authenticated);
</script>

<div class="flex h-full w-full">
	{#if !authenticated}
		<div class="relative flex w-full flex-col overflow-hidden text-nowrap">
			<Breadcrumb />
			<div
				class="m-auto flex h-full w-full max-w-3xl flex-col items-start justify-start gap-4 p-16"
			>
				<Typography variant="title-md" class="mb-0">
					Please enter the key for this environment
				</Typography>
				<Input bind:value={newKey} placeholder="sp-critino-env-..." />
				<Button
					on:click={async () => {
						window.location.href =
							window.location.href.split('?')[0] + `?key=${newKey}`;
					}}
				>
					Enter
				</Button>
			</div>
		</div>
	{:else}
		<!-- Nav -->
		<div class="flex h-full w-64 flex-col items-start justify-start">
			<div class="flex h-14 w-full items-center justify-start px-4">
				<Typography
					variant="title-md"
					overflow="ellipsis"
					class="mb-0 w-full overflow-hidden text-ellipsis pb-0 text-left"
				>
					{environment.name.split('/').pop()}
				</Typography>
			</div>
			<Separator class="mt-0 pt-0 opacity-20" />

			<Nav routes={primaryRoutes(team, environments, environment, critiques)} />
		</div>

		<Separator orientation="vertical" class="ml-0 pl-0 opacity-20" />
		<!-- /Nav -->

		<div class="relative flex max-h-screen w-full flex-col overflow-x-hidden text-nowrap">
			<Breadcrumb />
			<slot />
		</div>
	{/if}
</div>

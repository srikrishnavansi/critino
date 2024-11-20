<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import CritiqueTable from './critique-table.svelte';
	import { Typography } from '$lib/components/ui/typography';
	import { toast } from 'svelte-sonner';
	import type { Tables } from '$lib/supabase';

	let { data } = $props();

	let { supabase, environment, critiques } = $derived(data);

	const filterTabs = (critiques: Tables<'critiques'>[]): string[] => {
		const tabs: string[] = [];
		for (let critique of critiques) {
			const tab = critique.tab ?? '';
			if (!tabs.includes(tab)) {
				tabs.push(tab);
			}
		}
		return tabs;
	};

	let tabs = $derived(filterTabs(critiques));

	const handleDelete = async (id: string) => {
		const { error: e } = await supabase.from('critiques').delete().eq('id', id);

		if (e) {
			const message = `Error deleting critique: ${JSON.stringify(e, null, 2)}`;
			console.error(message);
			toast.error(message);
			return;
		}
		data.critiques = critiques.filter((critique) => critique.id !== id);

		toast.success('Critique deleted!');
	};
</script>

<div class="flex w-full items-center justify-center p-12">
	{#if tabs.length > 1}
		<Tabs.Root value={tabs.find((tab) => tab) ?? ''} class="h-full w-full">
			<Tabs.List class="flex w-full gap-2">
				{#each tabs as tab}
					<Tabs.Trigger class="flex-1" value={tab}>{tab}</Tabs.Trigger>
				{/each}
			</Tabs.List>
			{#each tabs as tab}
				<Tabs.Content value={tab}>
					<CritiqueTable
						{environment}
						{tab}
						bind:critiques={data.critiques}
						{handleDelete}
					/>
				</Tabs.Content>
			{/each}
		</Tabs.Root>
	{:else if tabs[0] != null}
		<CritiqueTable {environment} tab={''} bind:critiques={data.critiques} {handleDelete} />
	{:else}
		<div class="mx-auto h-full w-full text-left">
			<Typography variant="display-lg">No Critiques Created Yet</Typography>
		</div>
	{/if}
</div>

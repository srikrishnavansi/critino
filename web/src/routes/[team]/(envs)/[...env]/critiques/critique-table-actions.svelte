<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Pencil, Trash2 } from 'lucide-svelte';

	type Props = {
		id: string;
		handleDelete: (id: string) => void;
	};

	let { id, handleDelete }: Props = $props();
</script>

<div class="flex flex-shrink justify-end gap-1">
	<Button
		variant="ghost"
		class="aspect-1 p-1 text-primary hover:bg-transparent hover:text-primary-container-on"
		on:click={() => goto(`critiques/${id}`)}
	>
		<Pencil></Pencil>
	</Button>
	<Button
		variant="ghost"
		class="aspect-1 p-1 text-error hover:bg-transparent hover:text-error-container-on"
		on:click={() => handleDelete(id)}
	>
		<Trash2></Trash2>
	</Button>
</div>

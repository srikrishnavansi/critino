<script lang="ts">
	import type { Icon } from 'lucide-svelte';

	type $$Props = Icon['$$prop_def'];
	type $$Events = Icon['$$events_def'];
	type $$Slots = Icon['$$slot_def'];
</script>

<img alt="Critino Logo" src="/favicon.png" height="24" width="24" {...$$restProps} />

import * as Icons from 'lucide-svelte';
import type { Route } from '$lib/types/routes';
import type { Tables } from '$lib/supabase';
import { sluggify } from '$lib/utils';

export const primaryRoutes = (
	team: Tables<'teams'>,
	environments: Tables<'environments'>[],
	environment: Tables<'environments'>,
	critiques: Tables<'critiques'>[]
): Route[] => [
	{
		title: 'Environments',
		label: environments.length.toString(),
		href: `/${team.name}/${sluggify(environment.name)}`,
		icon: Icons.Orbit,
		variant: 'ghost',
	},
	{
		title: 'Critiques',
		label: critiques.length.toString(),
		href: `/${team.name}/${sluggify(environment.name)}/critiques`,
		icon: Icons.ListTodo,
		variant: 'ghost',
	},
	{
		title: 'Settings',
		label: null,
		href: `/${team.name}/${sluggify(environment.name)}/settings`,
		icon: Icons.Settings,
		variant: 'ghost',
	},
];

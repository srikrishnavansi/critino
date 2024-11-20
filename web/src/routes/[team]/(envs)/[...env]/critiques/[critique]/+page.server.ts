import { error } from '@sveltejs/kit';

export const load = async ({ params, parent, locals: { supabase } }) => {
	const { team, environment, critiques } = await parent();

	const critique = critiques.find((c) => c.id === params.critique);

	if (!environment) {
		throw error(404, `Critique not found: ${params.critique}`);
	}

	return {
		team,
		environment,
		critique,
	};
};

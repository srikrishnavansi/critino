import api from '$lib/api';
import type { Tables } from '$lib/supabase/database.types.js';
import { sluggify } from '$lib/utils';
import { error, type Cookies } from '@sveltejs/kit';

export const load = async ({ url, cookies, parent, params, locals: { supabase } }) => {
	const { team, environments } = await parent();

	const environment = environments.find((env) => sluggify(env.name) === sluggify(params.env));

	if (!environment) {
		throw error(404, `Environment not found: ${params.env} (${sluggify(params.env)})`);
	}

	const { data: critiques, error: eCritiques } = await supabase
		.from('critiques')
		.select('*')
		.eq('team_name', team.name)
		.eq('environment_name', environment.name);

	if (!critiques || eCritiques) {
		const message = `Error fetching critiques: ${JSON.stringify(eCritiques, null, 2)}`;
		console.error(message);
		throw error(500, message);
	}

	const getKey = (url: URL, cookies: Cookies, environment: Tables<'environments'>): string => {
		console.log('getKey', url, cookies, environment);
		const searchKey = url.searchParams.get('key');
		if (searchKey) {
			const cookieKey = `key-${environment.team_name}-${environment.name}`;
			cookies.set(cookieKey, searchKey, { path: '/', secure: false });
			console.log(`Set cookie: ${cookieKey} = ${searchKey}`);
			return searchKey;
		}

		const segments = environment.name.split('/');
		let key: string | undefined = '';

		for (let i = segments.length; i >= 0; i--) {
			const envSegment = segments.slice(0, i).join('/');
			const currentKey = `key-${environment.team_name}${envSegment ? '-' + envSegment : ''}`;
			key = cookies.get(currentKey);
			console.log(`Get cookie: ${currentKey}, key: ${key}`);
			if (key) return key;
		}

		return '';
	};

	const key = getKey(url, cookies, environment);

	const rParams = {
		query: {
			team_name: environment.team_name,
			parent_name:
				environment.name.split('/').length === 1
					? null
					: environment.name.split('/').slice(0, -1).join('/'),
		},
		path: { name: environment.name.split('/').pop() },
		header: {
			'x-critino-key': key,
		},
	};

	console.log('rParams', rParams);
	const authResponse = await api.GET('/auth/environment/{name}', {
		params: rParams,
	});
	console.log('authResponse', JSON.stringify(authResponse, null, 2));

	const authenticated = authResponse.response.status === 200;

	return {
		authenticated,
		critiques,
		environment,
	};
};

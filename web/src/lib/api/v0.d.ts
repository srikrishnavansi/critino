/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Redirect To Docs */
        get: operations["redirect_to_docs__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/team/{name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Authenticate Team */
        get: operations["authenticate_team_auth_team__name__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/environment/{name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Authenticate Environment */
        get: operations["authenticate_environment_auth_environment__name__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/environments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Environments */
        get: operations["list_environments_environments_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/environments/{name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Read Environment */
        get: operations["read_environment_environments__name__get"];
        put?: never;
        /** Create Environment */
        post: operations["create_environment_environments__name__post"];
        /** Delete Environment */
        delete: operations["delete_environment_environments__name__delete"];
        options?: never;
        head?: never;
        /** Update Environment */
        patch: operations["update_environment_environments__name__patch"];
        trace?: never;
    };
    "/environments/{name}/key": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Delete Environment Key */
        delete: operations["delete_environment_key_environments__name__key_delete"];
        options?: never;
        head?: never;
        /** Update Environment Key */
        patch: operations["update_environment_key_environments__name__key_patch"];
        trace?: never;
    };
    "/critiques/ids": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Critique Ids */
        get: operations["get_critique_ids_critiques_ids_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/critiques": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** List Critiques */
        get: operations["list_critiques_critiques_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/critiques/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Upsert */
        post: operations["upsert_critiques__id__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** DeleteEnvironmentKeyResponse */
        DeleteEnvironmentKeyResponse: {
            /** Data */
            data: Record<string, never>;
            /** Key */
            key: string | null;
        };
        /** GetAuthResponse */
        GetAuthResponse: {
            /** Status */
            status: number;
            /** Detail */
            detail: string;
        };
        /** GetCritiquesResult */
        GetCritiquesResult: {
            /** Situation */
            situation?: string | null;
            /** Data */
            data: components["schemas"]["StrippedCritique"][];
            /** Count */
            count: number;
        };
        /** GetEnvironmentResponse */
        GetEnvironmentResponse: {
            /** Data */
            data: Record<string, never>;
        };
        /** GetEnvironmentsResponse */
        GetEnvironmentsResponse: {
            /** Data */
            data: unknown[];
            /** Count */
            count: number;
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** PatchEnvironmentKeyResponse */
        PatchEnvironmentKeyResponse: {
            /** Data */
            data: Record<string, never>;
            /** Key */
            key: string | null;
        };
        /** PatchEnvironmentResponse */
        PatchEnvironmentResponse: {
            /** Data */
            data: Record<string, never>;
        };
        /** PostCritiquesBody */
        PostCritiquesBody: {
            /** Query */
            query?: string | null;
            /** Response */
            response?: string | null;
            /** Context */
            context?: string | null;
            /** Optimal */
            optimal?: string | null;
            /** Instructions */
            instructions?: string | null;
        };
        /** PostCritiquesResponse */
        PostCritiquesResponse: {
            /** Url */
            url: string;
            /** Data */
            data: Record<string, never>;
        };
        /** PostEnvironmentBody */
        PostEnvironmentBody: {
            /**
             * Description
             * @default
             */
            description: string;
            /**
             * Gen Key
             * @default false
             */
            gen_key: boolean;
        };
        /** PostEnvironmentResponse */
        PostEnvironmentResponse: {
            /** Data */
            data: Record<string, never>;
            /** Key */
            key: string | null;
        };
        /** StrippedCritique */
        StrippedCritique: {
            /** Context */
            context: string;
            /** Query */
            query: string;
            /** Optimal */
            optimal: string;
            /** Instructions */
            instructions: string;
            /** Situation */
            situation: string;
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    redirect_to_docs__get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    authenticate_team_auth_team__name__get: {
        parameters: {
            query?: never;
            header: {
                "x-critino-key": string;
            };
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetAuthResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    authenticate_environment_auth_environment__name__get: {
        parameters: {
            query: {
                team_name: string;
                parent_name?: string | null;
            };
            header: {
                "x-critino-key": string;
            };
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetAuthResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    list_environments_environments_get: {
        parameters: {
            query: {
                team_name: string;
                parent_name?: string | null;
            };
            header: {
                "x-critino-key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetEnvironmentsResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    read_environment_environments__name__get: {
        parameters: {
            query: {
                team_name: string;
                parent_name?: string | null;
            };
            header: {
                "x-critino-key": string;
            };
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetEnvironmentResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    create_environment_environments__name__post: {
        parameters: {
            query: {
                team_name: string;
                parent_name?: string | null;
            };
            header: {
                "x-critino-key": string;
            };
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostEnvironmentBody"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostEnvironmentResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_environment_environments__name__delete: {
        parameters: {
            query: {
                team_name: string;
                parent_name?: string | null;
            };
            header: {
                "x-critino-key": string;
            };
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_environment_environments__name__patch: {
        parameters: {
            query: {
                team_name: string;
                parent_name?: string | null;
            };
            header: {
                "x-critino-key": string;
            };
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostEnvironmentBody"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PatchEnvironmentResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    delete_environment_key_environments__name__key_delete: {
        parameters: {
            query: {
                team_name: string;
                parent_name?: string | null;
            };
            header: {
                "x-critino-key": string;
            };
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DeleteEnvironmentKeyResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    update_environment_key_environments__name__key_patch: {
        parameters: {
            query: {
                team_name: string;
                parent_name?: string | null;
            };
            header: {
                "x-critino-key": string;
            };
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PatchEnvironmentKeyResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_critique_ids_critiques_ids_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string[];
                };
            };
        };
    };
    list_critiques_critiques_get: {
        parameters: {
            query: {
                team_name: string;
                environment_name: string;
                context?: string | null;
                query?: string | null;
                k?: number | null;
                similarity_key?: "query" | "situation" | "context";
            };
            header: {
                "x-critino-key": string;
                "x-openrouter-api-key": string | null;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetCritiquesResult"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    upsert_critiques__id__post: {
        parameters: {
            query: {
                team_name: string;
                environment_name: string;
                populate_missing?: boolean;
            };
            header: {
                "x-critino-key": string;
                "x-openrouter-api-key": string | null;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostCritiquesBody"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostCritiquesResponse"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}

---
name: api
description: How to fetch server data in this repo with @tanstack/react-query (api folder, QueryXxx / MutateXxx files, Api object). Use whenever adding or editing data fetching.
---

# API

Data fetching uses `@tanstack/react-query`. Reference: `apps/host/src/pages/pageHome/components/desktop/apps/redis/api`.

## Folder

```
api/
├── Api.tsx            exports the Api object grouping every endpoint
├── Api.types.tsx      response and shared types
├── Api.utils.tsx      helpers (optional)
└── <resource>/
    ├── QueryXxx.tsx   reads  → export const queryXxx
    └── MutateXxx.tsx  writes → export const mutateXxx
```

## Query

```tsx
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

import type { Me } from "../Api.types";

const send = async (): Promise<Me> => {
	const response = await fetch(url);
	return response.json();
};

export const queryMe = (options?: Partial<UseQueryOptions<Me, Error>>) => {
	return useQuery({
		queryKey: ["me"],
		queryFn: send,
		...options,
	});
};
```

## Mutation

```tsx
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

type Props = {
	email: string;
	password: string;
};

const send = async (props: Props): Promise<Result> => {
	...
};

export const mutateLogin = (options?: UseMutationOptions<Result, Error, Props, unknown>) => {
	const { mutateAsync } = useMutation({
		mutationFn: (props: Props) => send(props),
		...options,
	});

	return mutateAsync;
};
```

## Api object

```tsx
export const Api = {
	login: {
		mutateLogin,
		mutateLogout,
	},
	me: {
		queryMe,
	},
};
```

Components call endpoints through it: `Api.me.queryMe()`.

## Rules

- The fetch function is a private `send` in the same file
- Every query/mutation accepts an optional `options` argument spread last
- Query keys start with the resource name

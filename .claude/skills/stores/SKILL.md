---
name: stores
description: How to write zustand stores for shared client state in this repo. Use whenever creating or editing a store or adding shared state.
---

# Stores

- Use zustand for state shared between components; keep local state in `useState`
- File `stores/StoreXxx.ts`, export `const StoreXxx`
- Put the store in the `stores/` folder of the closest component that uses it
- State type is named `Props`
- Keep initial values in `initialState`
- Use `persist` only for state that must survive a reload; give it a unique `name` and a `version`

```ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Props = {
	name: string;
	setName: (name: string) => void;
};

const initialState = {
	name: "",
};

export const StoreChat = create<Props>()(
	persist(
		(set) => ({
			...initialState,
			setName: (name: string) => set(() => ({ name })),
		}),
		{
			version: 1,
			name: "chat",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
```

Usage:

```tsx
const name = StoreChat((state) => state.name);
```

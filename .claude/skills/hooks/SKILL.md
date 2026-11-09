---
name: hooks
description: How to write React custom hooks in this repo. Use whenever creating or editing a custom hook.
---

# Hooks

- File `UseXxx.tsx` (uppercase, like all files), export `const useXxx`
- Shared hooks go in `src/hooks/`; hooks used by one component go in that component's `hooks/` folder
- Arrow function, named export
- Clean up timers, listeners and subscriptions in the effect's return
- Input with more than two values: take one props object

```tsx
import { useEffect, useState } from "react";

export const useDebounce = <T,>(value: T, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};
```

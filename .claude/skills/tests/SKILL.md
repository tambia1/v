---
name: tests
description: How to write unit tests (Vitest) and visual tests (Playwright) in this repo. Use whenever adding or editing tests.
---

# Tests

## Unit tests (Vitest)

- File `Name.test.tsx` next to the file it tests
- Import test functions from `vite-plus/test`, not `vitest`
- Group with `describe`, write cases with `it("should ...")`
- Prefer testing pure functions from `Name.utils.tsx`
- Run: `npm test` in `apps/host`

```tsx
import { describe, expect, it } from "vite-plus/test";

import { getWeatherDescription } from "./Weather.utils";

describe("Weather", () => {
	describe("getWeatherDescription", () => {
		it("should return the description for a known code", () => {
			expect(getWeatherDescription(0)).toBe("Clear sky");
		});
	});
});
```

## Visual tests (Playwright)

- Files in `apps/host/src/visuals/` named `name.spec.tsx`
- Run: `npm run test:visuals` in `apps/host`
- Update snapshots only when the visual change is intended: `npm run test:visuals:update`

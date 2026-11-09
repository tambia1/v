---
name: micro-frontends
description: How the micro-frontends (apps/mfe-test1, mfe-test2) and the shared UI package (packages/ui, @v/shared-ui) connect to the host app. Use when adding or changing a remote app, an exposed module, or a shared package component.
---

# Micro-frontends

The host loads remote apps at runtime with Module Federation (`@originjs/vite-plugin-federation`), and shares components at build time through `@v/shared-ui`.

| Project          | Port | Role                                    |
| :--------------- | :--- | :-------------------------------------- |
| `apps/host`      | 5000 | Host, loads the remotes                 |
| `apps/mfe-test1` | 5001 | Remote `remoteFrontend1`                |
| `apps/mfe-test2` | 5002 | Remote `remoteFrontend2`                |
| `packages/ui`    | 8080 | Shared component library `@v/shared-ui` |

## Expose a module from a remote

`apps/mfe-test1/vite.config.ts`:

```ts
federation({
	name: "frontend",
	filename: "remote.js",
	exposes: {
		"./Mfe": "./src/mfe/Mfe.tsx",
	},
}),
```

The exposed file exports a named component:

```tsx
export const Mfe = () => {
	return <div>...</div>;
};
```

## Load it in the host

1. Register the remote in `apps/host/vite.config.ts`:
   ```ts
   federation({
   	remotes: {
   		remoteFrontend1: "http://localhost:5001/v/assets/remote.js",
   	},
   }),
   ```
2. Declare its type in `apps/host/types.d.ts`:
   ```ts
   declare module "remoteFrontend1/Mfe" {
   	export const Mfe: () => JSX.Element;
   }
   ```
3. Import it lazily (e.g. in `Desktop.apps.tsx`):
   ```tsx
   const TestMfe1 = lazy(() => import("remoteFrontend1/Mfe").then((module) => ({ default: module.Mfe })));
   ```

The remote must be built and served for the host to load it: `npm run serve` in the remote's folder.

## New remote app

Copy `apps/mfe-test1`, then change the package `name`, the port in every script, and the `exposes` map. Add it to the host as above with the next free port.

## Shared UI package

`packages/ui` builds with `vp pack` from `src/lib/index.ts`.

To share a component:

1. Create it in `packages/ui/src/components/<name>/` (follow the `components-structure`, `structure` and `styles` skills)
2. Export it from `packages/ui/src/lib/index.ts`:
   ```ts
   export { Button } from "./../components/button/Button";
   ```
3. Build the package: `npm run build` in `packages/ui` (or `npm run dev` to watch)
4. Import it in an app: `import { Button } from "@v/shared-ui";`

Apps depend on it with `"@v/shared-ui": "file:../../packages/ui"`.

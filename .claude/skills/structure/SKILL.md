---
name: structure
description: Folder layout and file naming in this repo (component folders, .styles, .types, .utils, .test, hooks, stores, api, assets). Use whenever creating, moving or renaming files or folders.
---

# Structure

## Naming

- Folders start with a lowercase letter: camelCase (`iconButton`, `pageHome`, `chatBot`)
- Files start with an uppercase letter: PascalCase
  - Components: same name as the folder (`iconButton/IconButton.tsx`)
  - Hooks: `UseDebounce.tsx` exports `useDebounce`
  - Stores: `StoreChat.ts` exports `StoreChat`
- Exceptions: locale files (`locales/en/home.tsx`, `locales/types/home.types.tsx`) and visual tests (`visuals/desktop.spec.tsx`) are lowercase
- Use `.tsx` for source files

## File suffixes

Files that belong to a component sit next to it and share its name:

| File              | Contains                                       |
| :---------------- | :--------------------------------------------- |
| `Name.tsx`        | The component                                  |
| `Name.styles.tsx` | Emotion styled elements, imported as `* as S`  |
| `Name.types.tsx`  | Types shared by the component and its children |
| `Name.utils.tsx`  | Pure helper functions                          |
| `Name.test.tsx`   | Vitest unit tests                              |
| `Name.data.tsx`   | Static data                                    |

Don't create `types/` or `utils/` subfolders for a single component; use the suffixed files above.

## Component folder

```
weather/
├── Weather.tsx
├── Weather.styles.tsx
├── Weather.types.tsx
├── Weather.utils.tsx
├── Weather.test.tsx
├── components/        sub-components, each in its own folder
├── hooks/             hooks used only by this component
├── stores/            zustand stores used only by this component
├── api/               data fetching (see the api skill)
└── assets/            images, sounds, models
```

Only create the folders you need.

## Placement

- Put code next to where it's used. Move it up to a shared folder only when a second place needs it.
- Shared in the host app:
  - `src/components/` reusable UI components
  - `src/hooks/` reusable hooks
  - `src/utils/` reusable helpers
  - `src/services/` browser/service wrappers
  - `src/theme/` themes and theme types
  - `src/locales/` i18n
- Pages live in `src/pages/pageXxx/PageXxx.tsx`
- Desktop apps live in `src/pages/pageHome/components/desktop/apps/<appName>/`
- Visual (Playwright) tests live in `src/visuals/` as `name.spec.tsx`

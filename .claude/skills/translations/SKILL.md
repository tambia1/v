---
name: translations
description: How to add or change UI text with i18n in apps/host (locales types, en, fi, lang object, T component). Use whenever adding, changing or removing any text shown to the user.
---

# Translations

All UI text goes through i18next. Never hard-code text in components.

## Files

`apps/host/src/locales/`

```
locales/
├── i18n.tsx              setup + typed `lang` object
├── i18n.types.tsx        languages: "en", "fi"
├── T.tsx                 <T> component
├── types/
│   ├── home.types.tsx    desktop and app texts
│   ├── settings.types.tsx
│   └── chat.types.tsx
├── en/                   English values, same file names
└── fi/                   Finnish values, same file names
```

## Add a text

Add the same key in three places:

1. `types/home.types.tsx`
   ```tsx
   todo: {
   	title: string;
   	addItem: string;
   }
   ```
2. `en/home.tsx`
   ```tsx
   todo: {
   	title: "Todo",
   	addItem: "Add item",
   },
   ```
3. `fi/home.tsx`
   ```tsx
   todo: {
   	title: "Tehtävät",
   	addItem: "Lisää tehtävä",
   },
   ```

TypeScript fails if a language is missing a key.

Group keys by app or feature (`lang.<appName>.<key>`). Shared words (yes, no, ok, cancel) live in `lang.all`.

## Use a text

In JSX:

```tsx
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";

<T>{lang.todo.addItem}</T>;
```

Where a string is needed (props, attributes, logic):

```tsx
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

<Input placeholder={t(lang.todo.addItem)} />;
```

Always use the `lang` object, never a raw key string like `"todo.addItem"`.

## New topic file

For a large new area, add a new file to `types/`, `en/` and `fi/`, then add it to `Translation` in `i18n.types.tsx` and spread it into both languages in `i18n.tsx`.

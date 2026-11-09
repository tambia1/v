---
name: desktop-app
description: How to add a new app to the desktop in apps/host (app folder, title translations, icon, registration in Desktop.apps.tsx). Use whenever creating, renaming or removing a desktop app.
---

# Desktop app

The host app is a phone-like desktop. Every app is a component in `apps/host/src/pages/pageHome/components/desktop/apps/<appName>/`, registered in `Desktop.apps.tsx`. Apps are imported with the `@apps` alias.

Adding an app takes 4 steps. Example below: an app called `todo`.

## 1. Create the app folder

```
desktop/apps/todo/
├── Todo.tsx
├── Todo.styles.tsx
└── pages/              optional: screens pushed with the Navigator
    └── TodoPage.tsx
```

Follow the `structure` and `components-structure` skills for everything inside.

`Todo.tsx` — the root fills the screen and wraps the content in a `Navigator`, which gives the app a title bar and page navigation:

```tsx
import { Navigator } from "@src/components/navigator/Navigator";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";

import { TodoPage } from "./pages/TodoPage";
import * as S from "./Todo.styles";

export const Todo = () => {
	return (
		<S.Todo>
			<Navigator>
				<Navigator.Page name="app" title={<T>{lang.todo.title}</T>}>
					<TodoPage />
				</Navigator.Page>
			</Navigator>
		</S.Todo>
	);
};
```

`Todo.styles.tsx`:

```tsx
import styled from "@emotion/styled";

export const Todo = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;
```

To open another screen from inside the app:

```tsx
const navigator = useNavigator();

navigator.pushPage(
	<Navigator.Page name="details" title={t(lang.todo.title)}>
		<TodoDetails />
	</Navigator.Page>,
);
```

## 2. Add the title translations

Add the same key to all three files in `apps/host/src/locales/`:

- `types/home.types.tsx` → `todo: { title: string; };`
- `en/home.tsx` → `todo: { title: "Todo" },`
- `fi/home.tsx` → `todo: { title: "Tehtävät" },`

Put any other text of the app under the same key (`lang.todo.xxx`).

## 3. Add the icon

1. Add the image to `desktop/components/appButton/assets/todo.png` (square; `.png` or `.webp`)
2. In `desktop/components/appButton/AppButton.styles.tsx` import it and add it to `appIcons`:

```tsx
import todo from "./assets/todo.png";

export const appIcons = {
	...todo,
} as const;
```

Without an icon, use `"test"`.

## 4. Register the app

In `desktop/Desktop.apps.tsx` import the component and add an entry to `apps`:

```tsx
import { Todo } from "@apps/todo/Todo";

{ id: "todo", roles: ["admin", "user", "guest"], title: <T>{lang.todo.title}</T>, icon: "todo", component: <Todo /> },
```

| Field       | Value                                            |
| :---------- | :----------------------------------------------- |
| `id`        | Unique, same as the folder name                  |
| `roles`     | Who sees the app: `"admin"`, `"user"`, `"guest"` |
| `title`     | `<T>{lang.<appName>.title}</T>`                  |
| `icon`      | Key from `appIcons`                              |
| `component` | The app's root element                           |

`apps` is an array of pages on the desktop:

- First array: regular apps
- Second array: test and demo apps (usually `roles: ["admin"]`)

Heavy apps (big dependencies, models, 3D) are lazy-loaded; the desktop shows a loader while they load:

```tsx
const Todo = lazy(() => import("@apps/todo/Todo").then((module) => ({ default: module.Todo })));
```

## Check

Run `vp check`, then `npm run dev` and open the app from the desktop.

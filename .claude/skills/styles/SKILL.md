---
name: styles
description: How to style components in this repo with Emotion and the theme (Name.styles.tsx, $ props, theme colors, sizes, fonts, light/dark themes). Use whenever writing or editing styles.
---

# Styles

## Emotion

- Styles live in `Name.styles.tsx` next to the component, imported as `* as S`
- One `styled` element per export; the root element has the component's name
- Don't use StyleX, inline `style={{}}` or `.css` files for new code

```tsx
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { Theme } from "@src/theme/Theme.types";

export const Card = styled.div<{ $active: boolean; $size: keyof Theme["size"] }>`
	display: flex;
	padding: ${(props) => props.theme.size[props.$size]};
	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};

	${(props) =>
		props.$active &&
		css`
			border-color: ${props.theme.color.secondary500};
		`}
`;
```

```tsx
<S.Card $active={isActive} $size="size300">
```

- Props used only for styling start with `$` so they don't reach the DOM
- Conditional styles with `css` blocks, as above
- Accept `className` in components and pass it to the root, so parents can extend styles with `styled(Component)`

## Theme

Always use theme values, never hard-coded colors or sizes. `props.theme` in styled, `useTheme()` in components.

| Group    | Keys                                                                                                                          |
| :------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `color`  | `primary`, `secondary`, `success`, `danger`, ... each `100` (lightest) to `900` (darkest), plus `transparent`, `currentColor` |
| `size`   | `size50` to `size900`                                                                                                         |
| `font`   | `font100` to `font900`, each `{ size, weight }`                                                                               |
| `shadow` | `text`, `box`                                                                                                                 |

Type definitions: `apps/host/src/theme/Theme.types.tsx`.

For a component prop that picks a theme value, type it as `keyof Theme["size"]`, `keyof Theme["color"]`, etc.

## Light and dark

Themes: `src/theme/themes/themeLight/ThemeLight.tsx` and `themeDark/ThemeDark.tsx`. Every component must look right in both.

Adding a theme value:

1. Add it to `Theme` in `Theme.types.tsx`
2. Add it to both `ThemeLight.tsx` and `ThemeDark.tsx`

---
name: components-structure
description: How to build React components in this repo using composition and the compound component pattern (as in apps/host/src/components/modal). Use whenever creating or restructuring a component.
---

# Components structure

Before writing a component, check the `components-catalog` skill for an existing one.

Build every new component as a composition of small parts. Reference implementation: `apps/host/src/components/modal`.

## Rules

1. The main component renders a ready-to-use default layout from its props, built only from its own parts.
2. Every part is attached to the main component as a static property, so consumers can compose a custom layout instead.
3. Every component has a `Root` part that renders the outer styled element.
4. Parts can be compound components themselves, following the same rules, nested as deep as needed.
5. Only `root/` has styles for the container; each leaf part has its own `Name.styles.tsx`.

## Folder structure

```
modal/
├── Modal.tsx
├── root/
│   ├── Root.tsx
│   └── Root.styles.tsx
└── components/
    └── box/
        ├── Box.tsx
        ├── root/
        │   ├── Root.tsx
        │   └── Root.styles.tsx
        └── components/
            ├── content/
            └── buttons/
```

## Main component

```tsx
import { Box } from "./components/box/Box";
import { Root } from "./root/Root";

type Props = {
	isVisible?: boolean;
	title?: ReactNode;
};

export const Modal = ({ isVisible = true, title }: Props) => {
	return (
		<Modal.Root isVisible={isVisible}>
			<Modal.Box title={title} />
		</Modal.Root>
	);
};

Modal.Root = Root;
Modal.Box = Box;
```

- Inside the main component, use the parts through the static properties (`Modal.Root`, `Modal.Box`), not the imported names

## Root part

```tsx
import type { ReactNode } from "react";

import * as S from "./Root.styles";

export type Props = {
	children?: ReactNode;
};

export const Root = ({ children }: Props) => {
	return <S.Root>{children}</S.Root>;
};
```

## Leaf part

A leaf renders nothing when it has no content:

```tsx
export const Title = ({ children }: Props) => {
	return children && <S.Title>{children}</S.Title>;
};
```

## Usage

Default layout:

```tsx
<Modal title="Delete?" buttons={buttons} />
```

Custom composition:

```tsx
<Modal.Root>
	<Modal.Box.Root>
		<MyCustomContent />
		<Modal.Box.Buttons buttons={buttons} />
	</Modal.Box.Root>
</Modal.Root>
```

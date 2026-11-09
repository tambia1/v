---
name: components-catalog
description: Catalog of the shared UI components in apps/host/src/components (Button, Icon, List, Navigator, Modal, Text, Input, Select, ...). Use before building any UI, to reuse an existing component instead of writing a new one.
---

# Components catalog

Shared components live in `apps/host/src/components/`, imported as `@src/components/<name>/<Name>`. Reuse them before writing new ones. Read the component's file for its full props.

## Layout and navigation

| Component                                   | Use for                                                                                     |
| :------------------------------------------ | :------------------------------------------------------------------------------------------ |
| `Navigator` + `Navigator.Page`              | App screens with a title bar and back navigation; `useNavigator().pushPage()` / `popPage()` |
| `List`, `List.Section`, `List.Cell`         | Settings-style lists                                                                        |
| `Card` (`Root`, `Header`, `Body`, `Footer`) | Boxed content                                                                               |
| `Tab` (`Root`, `Item`)                      | Tabs                                                                                        |
| `Pager`                                     | Swipeable pages                                                                             |
| `SideMenu`                                  | Side drawer menu                                                                            |
| `Collapsable`                               | Show/hide content with `collapsed`                                                          |
| `Space`                                     | Fixed gap, `size` and `direction`                                                           |
| `Transition`                                | Animated swap of children                                                                   |

## Inputs

| Component                           | Use for                                                                               |
| :---------------------------------- | :------------------------------------------------------------------------------------ |
| `Button`                            | Buttons; `variant`: `styled`, `full`, `stroke`, `link`, `text`, `none`; `onLongClick` |
| `IconButton`                        | Button with an icon                                                                   |
| `Input`                             | Text input                                                                            |
| `Select` (`Display`, `Items`)       | Dropdown                                                                              |
| `Check`                             | Checkbox                                                                              |
| `Switch`                            | Toggle                                                                                |
| `Slider`                            | Range                                                                                 |
| `Stepper` (`Root`, `Minus`, `Plus`) | Number +/-                                                                            |
| `PopupMenu` + `PopupMenu.Item`      | Context menu                                                                          |

## Display

| Component                 | Use for                                                                           |
| :------------------------ | :-------------------------------------------------------------------------------- |
| `Text`                    | Text with theme `color`, `bgcolor`, `font`                                        |
| `Icon`                    | SVG icon by `iconName` (names in `icon/Icon.types.tsx`), `size`, `fill`, `stroke` |
| `Flag`                    | Country flag                                                                      |
| `Loader`                  | Loading spinner                                                                   |
| `Progress`                | Progress bar, `percent`                                                           |
| `Modal`                   | Dialog with icon, title, description, buttons                                     |
| `Table`                   | Tabular data                                                                      |
| `Tree`                    | Folder/item tree                                                                  |
| `Chart`                   | Line chart                                                                        |
| `WorldMap` (`Map`, `Pin`) | World map with pins                                                               |
| `Canvas`                  | Canvas drawing                                                                    |
| `Cube`                    | 3D CSS cube                                                                       |

## Utility

| Component    | Use for                                            |
| :----------- | :------------------------------------------------- |
| `Suspension` | Suspense + error boundary with lifecycle callbacks |

## New shared component

Create it in `src/components/` only when it's needed in more than one place; otherwise keep it in the feature's `components/` folder. Follow the `components-structure`, `structure` and `styles` skills.

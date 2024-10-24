import type { ReactNode } from "react";
import { List } from "../list/List";
import * as S from "./SideMenu.styles";

export type MenuGroup<MenuItemId> = {
	content: ReactNode;
	menuItems: MenuItem<MenuItemId>[];
};

export type MenuItem<MenuItemId> = {
	id: MenuItemId;
	content: ReactNode;
};

export interface Props<MenuItemId> {
	children?: ReactNode;
	className?: string;
	$visible: boolean;
	menuGroups: MenuGroup<MenuItemId>[];
	selectedMenuId: MenuItemId;
	onClickBackground: () => void;
	onClickItem: (id: MenuItemId) => void;
}

export const SideMenu = <MenuItemId extends string>({
	children,
	className,
	$visible,
	menuGroups,
	selectedMenuId,
	onClickBackground,
	onClickItem,
	...rest
}: Props<MenuItemId>) => {
	const handleOnClickBackground = () => {
		if ($visible) {
			onClickBackground();
		}
	};

	return (
		<S.SideMenu className={className} {...rest} onClick={handleOnClickBackground}>
			<S.Container>
				<S.Content>{children}</S.Content>

				<S.Cover $visible={$visible} />

				<S.MenuList $visible={$visible}>
					{menuGroups.map((menuGroup, index) => (
						<S.MenuGroup key={index}>
							<List.Section>{menuGroup.content}</List.Section>

							<List>
								{menuGroup.menuItems.map((menuItem) => (
									<List.Cell key={menuItem.id} $isSelected={selectedMenuId === menuItem.id} onClick={() => onClickItem(menuItem.id)}>
										{menuItem.content}
									</List.Cell>
								))}
							</List>
						</S.MenuGroup>
					))}
				</S.MenuList>
			</S.Container>
		</S.SideMenu>
	);
};

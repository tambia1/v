import * as S from "./Menu.styles";
import { List } from "../list/List";
import { ReactNode } from "react";

export type MenuGroup<MenuItemId> = {
	text: ReactNode;
	menuItems: MenuItem<MenuItemId>[];
};

export type MenuItem<MenuItemId> = {
	id: MenuItemId;
	text: ReactNode;
};

export interface Props<MenuItemId> {
	children?: ReactNode;
	className?: string | undefined;
	visible: boolean;
	menuGroups: MenuGroup<MenuItemId>[];
	onClickBackground: () => void;
	onClickItem: (id: MenuItemId) => void;
}

export const Menu = <MenuItemId extends string>({ children, className, visible, menuGroups, onClickBackground, onClickItem, ...rest }: Props<MenuItemId>) => {
	const handleOnClickBackground = () => {
		if (visible) {
			onClickBackground();
		}
	};

	return (
		<S.Menu className={className} {...rest} onClick={handleOnClickBackground}>
			<S.Container>
				<S.Content>{children}</S.Content>

				<S.Cover $visible={visible} />

				<S.MenuList $visible={visible}>
					{menuGroups.map((menuGroup, index) => (
						<S.MenuGroup key={index}>
							<List.Section>{menuGroup.text}</List.Section>

							<List>
								{menuGroup.menuItems.map((menuItem) => (
									<List.Cell key={menuItem.id} onClick={() => onClickItem(menuItem.id)}>
										{menuItem.text}
									</List.Cell>
								))}
							</List>
						</S.MenuGroup>
					))}
				</S.MenuList>
			</S.Container>
		</S.Menu>
	);
};

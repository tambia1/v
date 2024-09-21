import * as S from "./Menu.styles";
import { List } from "../list/List";
import { ReactNode } from "react";

export type MenuGroup = {
	text: ReactNode;
	menuItems: MenuItem[];
};

export type MenuItem = {
	id: string;
	text: ReactNode;
	onClick: (id: string) => void;
};

export interface Props {
	children?: ReactNode;
	className?: string | undefined;
	visible: boolean;
	menuGroups: MenuGroup[];
	onClickBackground: () => void;
}
export const Menu = ({ children, className, visible, menuGroups, onClickBackground, ...rest }: Props) => {
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
									<List.Cell
										key={menuItem.id}
										onClick={() => {
											menuItem.onClick(menuItem.id);
										}}
									>
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

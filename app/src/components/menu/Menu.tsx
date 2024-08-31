import * as S from "./Menu.styles";
import { List } from "../list/List";
import { T } from "@src/locales/T";

export type MenuGroup = {
	text: string;
	menuItems: MenuItem[];
};

export type MenuItem = {
	id: string;
	text: string;
	onClick: (id: string) => void;
};

export interface Props {
	className?: string | undefined;
	visible: boolean;
	menuGroups: MenuGroup[];
	onClickBackground: () => void;
}
export const Menu = ({ className, visible, menuGroups, onClickBackground, ...rest }: Props) => {
	return (
		<S.Menu className={className} {...rest} onClick={onClickBackground}>
			<S.Container>
				<S.Cover $visible={visible} />

				<S.MenuList $visible={visible}>
					{menuGroups.map((menuGroup) => (
						<>
							<List.Section>
								<T>{menuGroup.text}</T>
							</List.Section>

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
						</>
					))}
				</S.MenuList>
			</S.Container>
		</S.Menu>
	);
};

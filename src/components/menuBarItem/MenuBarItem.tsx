import * as S from "./MenuBarItem.styles";

export interface MenuBarItemProps {
	isSelected: boolean;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	children: React.ReactNode;
}

export const MenuBarItem = (props: MenuBarItemProps) => {
	return (
		<S.MenuItem $isSelected={props.isSelected} onClick={props.onClick}>
			{props.children}
		</S.MenuItem>
	);
};

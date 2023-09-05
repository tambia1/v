import * as S from "./MenuBar.styles";

export interface MenuBarProps {
	children?: React.ReactNode;
}

export const MenuBar = (props: MenuBarProps) => {
	return (
		<S.MenuBarContainer id={"menubar"}>
			<S.MenuLogoContainer id={"menubar-header"}>
				<S.MenuLogoIcon id={"menubar-icon"} />
				<S.MenuLogoText id={"menubar-title"}>redis</S.MenuLogoText>
			</S.MenuLogoContainer>

			<S.MenuItemsContainer id={"menubar-items"}>{props.children}</S.MenuItemsContainer>
		</S.MenuBarContainer>
	);
};

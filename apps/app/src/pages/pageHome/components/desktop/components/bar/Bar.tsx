import { Icon } from "@src/icons/Icon";
import * as S from "./Bar.styles";
import { IThemeName } from "@src/theme/Theme.types";
import { ReactNode } from "react";
import { useThemeContext } from "@src/theme/UseThemeContext";

interface Props {
	onClickButtonTheme: (themeName: IThemeName) => void;
	isVisibleButtonClose: boolean;
	onClickButtonClose: () => void;
	userName: ReactNode;
	userNameType: "success" | "error";
}

export const Bar = ({ onClickButtonTheme, onClickButtonClose, isVisibleButtonClose, userName, userNameType }: Props) => {
	const { theme } = useThemeContext();

	return (
		<S.Container>
			<S.IconClose onClick={onClickButtonClose} $isVisible={isVisibleButtonClose}>
				<Icon iconName="iconXCircle" size={theme.size.l} />
			</S.IconClose>

			<S.Username>
				{userNameType === "success" && <S.Success>{userName}</S.Success>}
				{userNameType === "error" && <S.Error>{userName}</S.Error>}
			</S.Username>

			<S.IconTheme $isVisible={true}>
				{theme.themeName === "light" ? <Icon iconName="iconSun" onClick={() => onClickButtonTheme("dark")} /> : <Icon iconName="iconMoon" onClick={() => onClickButtonTheme("light")} />}
			</S.IconTheme>
		</S.Container>
	);
};

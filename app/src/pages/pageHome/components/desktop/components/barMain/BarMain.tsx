import { Icon } from "@src/icons/Icon";
import * as S from "./BarMain.styles";
import { ITheme } from "@src/theme/Theme.types";
import { ReactNode } from "react";
import { useThemeContext } from "@src/theme/UseThemeContext";
import { IBarPosition } from "../../Desktop.styles";

interface Props {
	barPosition: IBarPosition;
	onClickButtonTheme: (themeName: ITheme["themeName"]) => void;
	isVisibleButtonClose: boolean;
	onClickButtonClose: () => void;
	userName: ReactNode;
	userNameType: "success" | "error";
}

export const BarMain = ({ barPosition, onClickButtonTheme, onClickButtonClose, isVisibleButtonClose, userName, userNameType }: Props) => {
	const { theme } = useThemeContext();

	return (
		<S.Container>
			<S.IconClose onClick={onClickButtonClose} $isVisible={isVisibleButtonClose} $barPosition={barPosition}>
				<Icon iconName="iconXCircle" size={theme.size.l} />
			</S.IconClose>

			<S.Username>
				{userNameType === "success" && <S.Success>{userName}</S.Success>}
				{userNameType === "error" && <S.Error>{userName}</S.Error>}
			</S.Username>

			<S.IconTheme $isVisible={true} $barPosition={barPosition}>
				{theme.themeName === "light" ? <Icon iconName="iconSun" onClick={() => onClickButtonTheme("dark")} /> : <Icon iconName="iconMoon" onClick={() => onClickButtonTheme("light")} />}
			</S.IconTheme>
		</S.Container>
	);
};

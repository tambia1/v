import { Icon } from "@src/components/icon/Icon";
import type { ITheme } from "@src/theme/Theme.types";
import { useThemeContext } from "@src/theme/UseThemeContext";
import type { ReactNode } from "react";
import type { IBarPosition } from "../../Desktop.styles";
import * as S from "./BarMain.styles";

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
				<Icon iconName="iconXCircle" />
			</S.IconClose>

			<S.Username>
				{userNameType === "success" && <S.Success>{userName}</S.Success>}
				{userNameType === "error" && <S.Error>{userName}</S.Error>}
			</S.Username>

			<S.IconTheme $isVisible={true} $barPosition={barPosition}>
				{theme.themeName === "light" ? (
					<Icon iconName="iconSun" onClick={() => onClickButtonTheme("dark")} />
				) : (
					<Icon iconName="iconMoon" onClick={() => onClickButtonTheme("light")} />
				)}
			</S.IconTheme>
		</S.Container>
	);
};

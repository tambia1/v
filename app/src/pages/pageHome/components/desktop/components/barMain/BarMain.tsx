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
		<S.BarMain>
			<S.IconClose onClick={onClickButtonClose} $isVisible={isVisibleButtonClose} $barPosition={barPosition}>
				<Icon iconName="iconXCircle" />
			</S.IconClose>

			<S.Username>
				{userNameType === "success" && <S.MessageSuccess>{userName}</S.MessageSuccess>}
				{userNameType === "error" && <S.MessageError>{userName}</S.MessageError>}
			</S.Username>

			{theme.themeName === "light" && (
				<S.IconTheme $isVisible={true} $barPosition={barPosition} onClick={() => onClickButtonTheme("dark")}>
					<Icon iconName="iconSun" />
				</S.IconTheme>
			)}
			{theme.themeName === "dark" && (
				<S.IconTheme $isVisible={true} $barPosition={barPosition} onClick={() => onClickButtonTheme("light")}>
					<Icon iconName="iconMoon" />
				</S.IconTheme>
			)}
		</S.BarMain>
	);
};

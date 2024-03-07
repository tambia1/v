import { Icon } from "@src/icons/Icon";
import * as S from "./Bar.styles";
import { ITheme, IThemeName } from "@src/theme/Theme.types";
import { ReactNode } from "react";

interface Props {
	theme: ITheme;
	userName: ReactNode;
	userNameType: "success" | "error";
	onClickButtonTheme: (themeName: IThemeName) => void;
	onClickButtonClose: () => void;
	isVisibleButtonClose: boolean;
}

export const Bar = ({ theme, userName, userNameType, onClickButtonTheme, onClickButtonClose, isVisibleButtonClose }: Props) => {
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

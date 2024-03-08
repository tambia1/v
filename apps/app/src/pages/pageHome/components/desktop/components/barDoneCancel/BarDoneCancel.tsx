import { Icon } from "@src/icons/Icon";
import * as S from "./BarDoneCancel.styles";
import { useThemeContext } from "@src/theme/UseThemeContext";

interface Props {
	isVisibleButtonDone?: boolean;
	onClickButtonDone?: () => void;
	isVisibleButtonCancel?: boolean;
	onClickButtonCancel?: () => void;
}

export const BarDoneCancel = ({ isVisibleButtonDone = false, onClickButtonDone, isVisibleButtonCancel = false, onClickButtonCancel }: Props) => {
	const { theme } = useThemeContext();

	return (
		<S.Container>
			<S.IconDone onClick={onClickButtonDone} $isVisible={isVisibleButtonDone}>
				<Icon iconName="iconCheck" size={theme.size.l} />
			</S.IconDone>

			<S.IconCancel onClick={onClickButtonCancel} $isVisible={isVisibleButtonCancel}>
				<Icon iconName="iconX" size={theme.size.l} />
			</S.IconCancel>
		</S.Container>
	);
};

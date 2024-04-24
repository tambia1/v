import { Icon } from "@src/icons/Icon";
import * as S from "./BarDoneCancel.styles";
import { useThemeContext } from "@src/theme/UseThemeContext";

interface Props {
	showDone?: boolean;
	onClickDone?: () => void;
	showCancel?: boolean;
	onClickCancel?: () => void;
}

export const BarDoneCancel = ({ showDone = false, onClickDone, showCancel = false, onClickCancel }: Props) => {
	const { theme } = useThemeContext();

	return (
		<S.Container>
			<S.IconDone onClick={onClickDone} $isVisible={showDone}>
				<Icon iconName="iconCheck" size={theme.size.l} />
			</S.IconDone>

			<S.IconCancel onClick={onClickCancel} $isVisible={showCancel}>
				<Icon iconName="iconX" size={theme.size.l} />
			</S.IconCancel>
		</S.Container>
	);
};

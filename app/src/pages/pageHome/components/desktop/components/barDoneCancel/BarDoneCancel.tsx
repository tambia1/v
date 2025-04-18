import { Icon } from "@src/components/icon/Icon";
import * as S from "./BarDoneCancel.styles";

interface Props {
	showDone?: boolean;
	onClickDone?: () => void;
	showCancel?: boolean;
	onClickCancel?: () => void;
}

export const BarDoneCancel = ({ showDone = false, onClickDone, showCancel = false, onClickCancel }: Props) => {
	return (
		<S.Container>
			<S.IconDone onClick={onClickDone} $isVisible={showDone}>
				<Icon iconName="iconCheck" size="size250" />
			</S.IconDone>

			<S.IconCancel onClick={onClickCancel} $isVisible={showCancel}>
				<Icon iconName="iconX" size="size250" />
			</S.IconCancel>
		</S.Container>
	);
};

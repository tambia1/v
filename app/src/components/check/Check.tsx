import { Icon } from "../icon/Icon";
import * as S from "./Check.styles";

type Props = {
	className?: string;
	checkState: boolean;
	onClickCheck: (checkState: boolean) => void;
};

export const Check = ({ className, onClickCheck, checkState = false }: Props) => {
	const handleOnClick = () => {
		onClickCheck(checkState);
	};

	return (
		<Check.Compose className={className} onClick={handleOnClick}>
			{!checkState && <Icon iconName="iconSquare" />}
			{checkState && <Icon iconName="iconVSquare" />}
		</Check.Compose>
	);
};

Check.Compose = S.Check;

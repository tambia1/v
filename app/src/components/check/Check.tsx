import type { HTMLAttributes } from "react";
import { Icon } from "../icon/Icon";
import * as S from "./Check.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	checkState: boolean;
	onClickCheck: (checkState: boolean) => void;
};

export const Check = ({ className, onClickCheck, checkState = false, ...rest }: Props) => {
	const handleOnClick = () => {
		onClickCheck(checkState);
	};

	return (
		<Check.Compose className={className} onClick={handleOnClick} {...rest}>
			{!checkState && <Icon iconName="iconSquare" />}
			{checkState && <Icon iconName="iconVSquare" />}
		</Check.Compose>
	);
};

Check.Compose = S.Check;

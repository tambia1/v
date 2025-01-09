import type { HTMLAttributes } from "react";
import { Icon } from "../icon/Icon";
import * as S from "./Check.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	checked: boolean;
	onClickCheck?: (checkState: boolean) => void;
	disabled?: boolean;
};

export const Check = ({ className, onClickCheck, checked = false, disabled = false, ...rest }: Props) => {
	const handleOnClick = () => {
		onClickCheck?.(checked);
	};

	return (
		<Check.Compose className={className} onClick={handleOnClick} aria-checked={checked} disabled={disabled} {...rest}>
			{!checked && <Icon iconName="iconSquare" />}
			{checked && <Icon iconName="iconVSquare" />}
		</Check.Compose>
	);
};

Check.Compose = S.Check;

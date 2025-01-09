import type { HTMLAttributes } from "react";
import * as S from "./Switch.styles";

type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	checked: boolean;
	onClickSwitch: (checked: boolean) => void;
	disabled?: boolean;
};

export const Switch = ({ className, onClickSwitch, checked = false, disabled = false, ...rest }: Props) => {
	const handleOnClick = () => {
		if (!disabled) {
			onClickSwitch(checked);
		}
	};

	return (
		<S.Switch className={className} onClick={handleOnClick} aria-checked={checked} disabled={disabled} {...rest}>
			<S.Dot $checked={checked} />
		</S.Switch>
	);
};

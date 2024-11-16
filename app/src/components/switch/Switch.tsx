import * as S from "./Switch.styles";

type Props = {
	className?: string;
	checked: boolean;
	onClickSwitch: (checked: boolean) => void;
};

export const Switch = ({ className, onClickSwitch, checked = false, ...rest }: Props) => {
	const handleOnClick = () => {
		onClickSwitch(checked);
	};

	return (
		<S.Switch className={className} onClick={handleOnClick} aria-checked={checked} {...rest}>
			<S.Dot $checked={checked} />
		</S.Switch>
	);
};

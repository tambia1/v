import { useState } from "react";
import * as S from "./Switch.styles";

interface Props {
	initialValue?: boolean;
	onChange: (isChecked: boolean) => void;
}

export const Switch = ({ onChange, initialValue = false }: Props) => {
	const [isChecked, setIsChecked] = useState(initialValue);

	const handleOnClick = () => {
		const updatedIsChecked = !isChecked;

		setIsChecked(updatedIsChecked);
		onChange(updatedIsChecked);
	};

	return (
		<S.Container onClick={handleOnClick}>
			<S.Dot $isChecked={isChecked} />
		</S.Container>
	);
};

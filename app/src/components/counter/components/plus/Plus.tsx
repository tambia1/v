import { useCounterContext } from "../contexts/Counter.context";
import * as S from "./Plus.styles";

export const Plus = () => {
	const counterContext = useCounterContext();

	const handleOnClick = () => {
		counterContext.setValue(counterContext.value + 1);
	};

	return <S.IconPlus iconName="iconPlusSquare" onClick={handleOnClick} />;
};

import { useCounterContext } from "../contexts/Counter.context";
import * as S from "./Minus.styles";

export const Minus = () => {
	const counterContext = useCounterContext();

	const handleOnClick = () => {
		counterContext.setValue(counterContext.value - 1);
	};

	return <S.IconMinus iconName="iconMinusSquare" onClick={handleOnClick} />;
};

import * as S from "./Compose.styles";
import { useCounterContext } from "../../../contexts/Counter.context";
import { IIconName } from "@src/components/icon/Icon.types";

export interface Props {
	iconName: IIconName;
	add: number;
}

export const Compose = ({ iconName, add }: Props) => {
	const counterContext = useCounterContext();

	const handleOnClick = () => {
		counterContext.setVal(Math.min(counterContext.val + add, counterContext.max));
	};

	return <S.Compose iconName={iconName} onClick={handleOnClick} />;
};

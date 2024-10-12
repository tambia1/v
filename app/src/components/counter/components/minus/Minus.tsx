import { Compose } from "./components/compose/Compose";

type Props = {
	onClickMinus: () => void;
};

export const Minus = ({ onClickMinus }: Props) => {
	return <Minus.Compose iconName="iconMinusSquare" onClickMinus={onClickMinus} />;
};

Minus.Compose = Compose;

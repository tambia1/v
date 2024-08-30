import { Compose } from "./components/compose/Compose";

export const Minus = () => {
	return <Minus.Compose iconName="iconMinusSquare" add={1} />;
};

Minus.Compose = Compose;

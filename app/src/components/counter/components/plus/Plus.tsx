import { Compose } from "./components/compose/Compose";

type Props = {
	onClickPlus: () => void;
};

export const Plus = ({ onClickPlus }: Props) => {
	return <Plus.Compose iconName="iconPlusSquare" onClickPlus={onClickPlus} />;
};

Plus.Compose = Compose;

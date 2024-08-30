import { Compose } from "./components/compose/Compose";

export const Plus = () => {
	return <Plus.Compose iconName="iconPlusSquare" add={1} />;
};

Plus.Compose = Compose;

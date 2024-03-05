import useLongPress from "@src/hooks/UseLongPress";
import { IAppId } from "../../Desktop.types";
import * as S from "./AppButton.styles";
import { ReactNode } from "react";

interface Props {
	id: IAppId;
	title: ReactNode;
	icon: S.IAppIcon;
	onClick: (id: IAppId) => void;
	onLongPress: (id: IAppId) => void;
	isLoading: boolean;
	isShakeMode: boolean;
}

export const AppButton = ({ id, title, icon, onClick, onLongPress, isLoading, isShakeMode }: Props) => {
	const handleOnLongPress = () => {
		onLongPress?.(id);
	};

	const handleOnClick = () => {
		onClick?.(id);
	};

	const longPressEvent = useLongPress({ onLongPress: handleOnLongPress, onClick: handleOnClick });

	return (
		<S.AppButton $isLoading={isLoading} $isShakeMode={isShakeMode} {...longPressEvent}>
			<S.Image $appIcon={icon} />
			<S.Title>{title}</S.Title>
		</S.AppButton>
	);
};

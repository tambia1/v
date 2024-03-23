import { ITouch, useTouch } from "@src/hooks/UseTouch";
import { IAppId } from "../../Desktop.types";
import * as S from "./AppButton.styles";
import { ReactNode, useRef } from "react";

interface Props {
	id: IAppId;
	title: ReactNode;
	icon: S.IAppIcon | string;
	onClick: (id: IAppId) => void;
	onLongPress: (id: IAppId) => void;
	isLoading: boolean;
	isShakeMode: boolean;
}

export const AppButton = ({ id, title, icon, onClick, onLongPress, isLoading, isShakeMode }: Props) => {
	const refButton = useRef<HTMLDivElement>(null);

	useTouch({
		ref: refButton,
		onTouch: ({ status, time }: ITouch) => {
			if (status === "long") {
				onLongPress?.(id);
			} else if (status === "up" && time < 700) {
				onClick?.(id);
			}
		},
		deps: [refButton.current],
	});

	return (
		<S.AppButton ref={refButton} $isLoading={isLoading} $isShakeMode={isShakeMode}>
			<S.Image $appIcon={icon} />
			<S.Title>{title}</S.Title>
		</S.AppButton>
	);
};

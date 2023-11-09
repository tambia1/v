import * as S from "./AppButton.styles";
import { IAppId } from "../../AppContainer";
import { ReactNode } from "react";

interface Props {
	id: IAppId;
	title: ReactNode;
	icon: S.IAppIcon;
	onClick?: (id: IAppId) => void;
}

export const AppButton = ({ id, title, icon, onClick }: Props) => {
	return (
		<S.AppButton
			onClick={() => {
				onClick?.(id);
			}}
		>
			<S.Image $appIcon={icon} />
			<S.Title>{title}</S.Title>
		</S.AppButton>
	);
};

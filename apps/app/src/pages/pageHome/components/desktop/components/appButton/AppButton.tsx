import { IAppId } from "../../Desktop.types";
import * as S from "./AppButton.styles";
import { ReactNode } from "react";

interface Props {
	id: IAppId;
	title: ReactNode;
	icon: S.IAppIcon;
	onClick: (id: IAppId) => void;
	isLoading: boolean;
}

export const AppButton = ({ id, title, icon, onClick, isLoading }: Props) => {
	return (
		<S.AppButton
			onClick={() => {
				onClick?.(id);
			}}
			$isLoading={isLoading}
		>
			<S.Image $appIcon={icon} />
			<S.Title>{title}</S.Title>
		</S.AppButton>
	);
};

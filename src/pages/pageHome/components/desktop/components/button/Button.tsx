import { IAppId } from "../../Desktop.types";
import * as S from "./Button.styles";
import { ReactNode } from "react";

interface Props {
	id: IAppId;
	title: ReactNode;
	icon: S.IAppIcon;
	onClick?: (id: IAppId) => void;
}

export const Button = ({ id, title, icon, onClick }: Props) => {
	return (
		<S.Button
			onClick={() => {
				onClick?.(id);
			}}
		>
			<S.Image $appIcon={icon} />
			<S.Title>{title}</S.Title>
		</S.Button>
	);
};

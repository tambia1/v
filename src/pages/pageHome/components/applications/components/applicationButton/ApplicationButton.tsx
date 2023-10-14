import { IAppId } from "../../../../data/apps";
import * as S from "./ApplicationButton.styles";

interface Props {
	id: IAppId;
	title: string;
	icon: S.Icon;
	onClick?: (id: IAppId) => void;
}

export const ApplicationButton = ({ id, title, icon, onClick }: Props) => {
	return (
		<S.Container
			onClick={() => {
				onClick?.(id);
			}}
		>
			<S.Image $icon={icon} />
			<S.Title>{title}</S.Title>
		</S.Container>
	);
};

import { AppId } from "../../../../data/apps";
import * as S from "./ApplicationButton.styles";

interface Props {
	id: AppId;
	title: string;
	icon: S.Icon;
	onClick?: (id: AppId) => void;
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

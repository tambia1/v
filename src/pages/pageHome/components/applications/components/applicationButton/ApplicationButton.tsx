import { Text } from "@src/components/text/Text";
import { IAppId } from "../../Applications";
import * as S from "./ApplicationButton.styles";

interface Props {
	id: IAppId;
	title: string;
	icon: S.IAppIcon;
	onClick?: (id: IAppId) => void;
}

export const ApplicationButton = ({ id, title, icon, onClick }: Props) => {
	return (
		<S.Container
			onClick={() => {
				onClick?.(id);
			}}
		>
			<S.Image $appIcon={icon} />
			<S.Title>
				<Text>{title}</Text>
			</S.Title>
		</S.Container>
	);
};

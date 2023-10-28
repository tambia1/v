import { Lang } from "@src/language/Lang";
import * as S from "./AppButton.styles";
import { IAppId } from "../../PageHome";

interface Props {
	id: IAppId;
	title: string;
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
			<S.Title>
				<Lang>{title}</Lang>
			</S.Title>
		</S.AppButton>
	);
};

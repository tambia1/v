import * as S from "./AppButton.styles";

interface Props {
	title: string;
	icon: S.Icon;
	onClick?: () => void;
}

export const AppButton = ({ title, icon, onClick }: Props) => {
	return (
		<S.Container onClick={onClick}>
			<S.Image $icon={icon} />
			<S.Title>{title}</S.Title>
		</S.Container>
	);
};

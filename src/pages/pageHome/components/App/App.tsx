import * as S from "./App.styles";

interface Props {
	title: string;
	icon: S.Icon;
	onClick?: () => void;
}

export const App = ({ title, icon, onClick }: Props) => {
	return (
		<S.Container onClick={onClick}>
			<S.Image $icon={icon} />
			<S.Title>{title}</S.Title>
		</S.Container>
	);
};

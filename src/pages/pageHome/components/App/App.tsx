import * as S from "./App.styles";

interface Props {
	title: string;
	onClick?: () => void;
}

export const App = ({ title, onClick }: Props) => {
	return (
		<S.Container onClick={onClick}>
			<S.Icon />
			<S.Title>{title}</S.Title>
		</S.Container>
	);
};

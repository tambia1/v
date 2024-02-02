import * as S from "./NotesContent.styles";

interface Props {
	title: string;
	text: string;
}

export const NotesContent = ({ title, text }: Props) => {
	const focusElement = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const clickedElement = event.currentTarget;

		if (clickedElement) {
			clickedElement.blur();
			clickedElement.focus();
		}
	};

	return (
		<S.NotesContent>
			<S.Title contentEditable onClick={focusElement}>
				{title}
			</S.Title>
			<S.Content contentEditable onClick={focusElement}>
				{text}
			</S.Content>
		</S.NotesContent>
	);
};

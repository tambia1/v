import * as S from "./NotesContent.styles";

interface Props {
	children: string;
}

export const NotesContent = ({ children }: Props) => {
	return (
		<S.NotesContent>
			<S.TextArea defaultValue={children}></S.TextArea>
		</S.NotesContent>
	);
};

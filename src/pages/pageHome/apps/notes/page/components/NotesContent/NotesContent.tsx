import { Button } from "@src/components/button/Button";
import { useNotesStore } from "../../../store/UseNotesStore";
import * as S from "./NotesContent.styles";
import { useTranslation } from "react-i18next";
import { lang } from "@src/locales/i18n";
import { useState } from "react";

interface Props {
	id: string;
	title: string;
	text: string;
}

export const NotesContent = ({ id, title, text }: Props) => {
	const { t } = useTranslation();
	const notes = useNotesStore();

	const [editedTitle, setEditedTitle] = useState(title);
	const [editedText, setEditedText] = useState(text);

	const focusElement = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const clickedElement = event.currentTarget;

		if (clickedElement) {
			clickedElement.blur();
			clickedElement.focus();
		}
	};

	const handleOnClickSave = () => {
		notes.setNote(id, editedTitle, editedText);
	};

	const handleTitleChange = (event: React.FormEvent<HTMLDivElement>) => {
		setEditedTitle(event.currentTarget.textContent || "");
	};

	const handleTextChange = (event: React.FormEvent<HTMLDivElement>) => {
		setEditedText(event.currentTarget.textContent || "");
	};

	return (
		<S.NotesContent>
			<S.Title contentEditable onClick={focusElement} onInput={handleTitleChange}>
				{editedTitle}
			</S.Title>
			<S.Content contentEditable onClick={focusElement} onInput={handleTextChange}>
				{editedText}
			</S.Content>
			<Button onClick={handleOnClickSave}>{t(lang.notes.save)}</Button>
		</S.NotesContent>
	);
};

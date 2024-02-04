import { Button } from "@src/components/button/Button";
import { useNotesStore } from "../../../store/UseNotesStore";
import * as S from "./NotesContent.styles";
import { useTranslation } from "react-i18next";
import { lang } from "@src/locales/i18n";
import { useEffect, useState } from "react";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { IPagerItem } from "@src/components/pager/Pager";

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

	const pager = usePager();

	useEffect(() => {
		return pager.addListener("popStart", "", handleOnPagerAction);
	}, []);

	const focusElement = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const clickedElement = event.currentTarget;

		if (clickedElement) {
			clickedElement.blur();
			clickedElement.focus();
		}
	};

	const handleOnClickSave = () => {
		console.log("aaa - 0", editedText);

		notes.setNote(id, editedTitle, editedText);
		pager.popPage();
	};

	const handleTitleChange = (event: React.FormEvent<HTMLDivElement>) => {
		setEditedTitle(event.currentTarget.textContent || "");
	};

	const handleTextChange = (event: React.FormEvent<HTMLDivElement>) => {
		setEditedText(event.currentTarget.textContent || "");
	};

	const handleOnPagerAction = (key?: string, pagerItem?: IPagerItem) => {
		console.log("aaa - 1", editedText);
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

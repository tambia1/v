import { Button } from "@src/components/button/Button";
import { useNotesStore } from "../../../store/UseNotesStore";
import * as S from "./NotesContent.styles";
import { useTranslation } from "react-i18next";
import { lang } from "@src/locales/i18n";
import { useEffect, useRef, useState } from "react";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Modal } from "@src/components/modal/Modal";
import { T } from "@src/locales/T";

interface Props {
	id: string;
	title: string;
	text: string;
}

export const NotesContent = ({ id, title, text }: Props) => {
	const { t } = useTranslation();
	const notes = useNotesStore();

	const refTitle = useRef<HTMLDivElement>(null);
	const refText = useRef<HTMLDivElement>(null);

	const navigator = useNavigator();

	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		return navigator.addListener("popStart", "1", handleOnNavigatorAction);
	}, []);

	const focusElement = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const clickedElement = event.currentTarget;

		if (clickedElement) {
			clickedElement.blur();
			clickedElement.focus();
		}
	};

	const handleOnClickSave = () => {
		const newTitle = refTitle.current?.textContent || "";
		const newText = refText.current?.textContent || "";

		if (newTitle !== title || newText !== text) {
			setIsModalVisible(true);

			return;
		}

		notes.setNote(id, newText, newTitle);
		navigator.popPage();
	};

	const cancelSaveNote = () => {
		setIsModalVisible(false);
	};

	const performSaveNote = () => {
		setIsModalVisible(false);
	};

	const handleOnNavigatorAction = () => {};

	return (
		<S.NotesContent>
			<S.Title ref={refTitle} contentEditable onClick={focusElement}>
				{title}
			</S.Title>

			<S.Content ref={refText} contentEditable onClick={focusElement}>
				{text}
			</S.Content>

			<Button onClick={handleOnClickSave}>{t(lang.notes.save)}</Button>

			<Modal
				isVisible={isModalVisible}
				iconName="question"
				text={<T>{lang.misc.areYouSure}</T>}
				onClickBackground={cancelSaveNote}
				buttonContentA={<T>{lang.misc.yes}</T>}
				buttonCallbackA={performSaveNote}
				buttonContentB={<T>{lang.misc.no}</T>}
				buttonCallbackB={cancelSaveNote}
			/>
		</S.NotesContent>
	);
};

import { Button } from "@src/components/button/Button";
import { useNotesStore } from "../../../store/UseNotesStore";
import * as S from "./NotesContent.styles";
import { useTranslation } from "react-i18next";
import { lang } from "@src/locales/i18n";
import { useEffect, useState } from "react";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Modal } from "@src/components/modal/Modal";
import { T } from "@src/locales/T";

interface IContent {
	newTitle: string;
	newText: string;
	oldTitle: string;
	oldText: string;
	isChanged: boolean;
}

interface Props {
	id: string;
	title: string;
	text: string;
}

export const NotesContent = ({ id, title, text }: Props) => {
	const { t } = useTranslation();
	const notes = useNotesStore();

	const [content, setContent] = useState<IContent>({
		newTitle: title,
		newText: text,
		oldTitle: title,
		oldText: text,
		isChanged: false,
	});

	const navigator = useNavigator();

	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		navigator.addListener("back", "NotesContent", () => handleOnNavigatorAction(content));

		return () => {
			navigator.removeListener("popStart", "NotesContent");
		};
	}, [content]);

	const handleOnClickSave = () => {
		notes.setNote(id, content.newTitle, content.newText);
		setContent({ ...content, oldTitle: content.newTitle, oldText: content.newText, isChanged: false });
	};

	const performExit = () => {
		setIsModalVisible(false);
		setContent({ ...content, isChanged: false });
		navigator.popPage();
	};

	const cancelExit = () => {
		setIsModalVisible(false);
	};

	const handleOnNavigatorAction = (newContent: IContent) => {
		if (newContent.isChanged) {
			setIsModalVisible(true);

			return false;
		}

		return true;
	};

	const handleTitlChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
		const value = e.currentTarget.value;
		setContent({ ...content, newTitle: value, isChanged: value !== content.oldTitle });
	};

	const handleTextChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
		const value = e.currentTarget.value;
		setContent({ ...content, newText: value, isChanged: value !== content.oldText });
	};

	return (
		<S.NotesContent>
			<S.Title value={content.newTitle} onInput={handleTitlChange} />
			<S.Content value={content.newText} onInput={handleTextChange} />

			<S.Buttons $isVisible={content.isChanged}>
				<Button onClick={handleOnClickSave}>{t(lang.notes.save)}</Button>
			</S.Buttons>

			<Modal
				isVisible={isModalVisible}
				iconName="question"
				text={<T>{lang.misc.areYouSure}</T>}
				onClickBackground={cancelExit}
				buttonContentA={<T>{lang.misc.yes}</T>}
				buttonCallbackA={performExit}
				buttonContentB={<T>{lang.misc.no}</T>}
				buttonCallbackB={cancelExit}
			/>
		</S.NotesContent>
	);
};

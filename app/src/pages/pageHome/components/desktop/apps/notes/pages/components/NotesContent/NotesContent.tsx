import { Button } from "@src/components/button/Button";
import { Modal } from "@src/components/modal/Modal";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNotesStore } from "../../../store/UseNotesStore";
import * as S from "./NotesContent.styles";

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
		navigator.addListener("back", "NotesContent", handleOnNavigatorAction);

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

	const handleOnNavigatorAction = () => {
		if (content.isChanged) {
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
				description={<T>{lang.all.areYouSure}</T>}
				onClickBackground={cancelExit}
				buttons={[
					{
						content: <T>{lang.all.yes}</T>,
						onClick: performExit,
					},
					{
						content: <T>{lang.all.no}</T>,
						onClick: cancelExit,
					},
				]}
			/>
		</S.NotesContent>
	);
};

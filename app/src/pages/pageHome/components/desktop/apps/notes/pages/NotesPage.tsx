import { Icon } from "@src/components/icon/Icon";
import { List } from "@src/components/list/List";
import { Modal } from "@src/components/modal/Modal";
import { Navigator } from "@src/components/navigator/Navigator";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Text } from "@src/components/text/Text";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import { useNotesStore } from "../store/UseNotesStore";
import * as S from "./NotesPage.styles";
import { NotesContent } from "./components/NotesContent/NotesContent";

export const NotesPage = () => {
	const navigator = useNavigator();
	const notesStore = useNotesStore();
	const [noteIdToRemove, setNoteIdToRemove] = useState("");

	const handleOnClickNote = (noteId: string) => {
		const note = notesStore.data[noteId];

		navigator.pushPage(
			<Navigator.Page id={String(note.id)} title={note.title}>
				<NotesContent id={note.id} title={note.title} text={note.text} />
			</Navigator.Page>,
		);
	};

	const handleOnClickAddNote = () => {
		const newNotes = structuredClone(notesStore.data);
		const date = new Date();
		const id = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

		newNotes[id] = {
			id: id,
			title: `My Note ${id}`,
			text: "Text",
		};

		notesStore.setNote(id, newNotes[id].title, newNotes[id].text);
	};

	const handleOnClickRemoveNote = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, noteId: string) => {
		e.stopPropagation();
		setNoteIdToRemove(noteId);
	};

	const performRemoveNote = () => {
		const newNotes = structuredClone(notesStore.data);
		delete newNotes[noteIdToRemove];
		notesStore.setNotes(newNotes);
		setNoteIdToRemove("");
	};

	const cancelRemoveNote = () => {
		setNoteIdToRemove("");
	};

	return (
		<S.NotesPage>
			<List.Section>
				<S.CellGrid>
					<Icon iconName="iconPlusCircle" onClick={handleOnClickAddNote} />
					<T>{lang.notes.notes}</T>
				</S.CellGrid>
			</List.Section>

			<List>
				{Object.keys(notesStore.data).map((noteId) => (
					<List.Cell
						key={noteId}
						onClick={() => {
							handleOnClickNote(noteId);
						}}
					>
						<S.CellGrid>
							<Icon
								iconName="iconMinusCircle"
								onClick={(e) => {
									handleOnClickRemoveNote(e, noteId);
								}}
							/>
							<Text>{notesStore.data[noteId].title}</Text>
						</S.CellGrid>
					</List.Cell>
				))}
			</List>

			<Modal
				isVisible={noteIdToRemove !== ""}
				iconName="question"
				text={<T>{lang.all.areYouSure}</T>}
				onClickBackground={cancelRemoveNote}
				buttons={[
					{
						content: <T>{lang.all.yes}</T>,
						onClick: performRemoveNote,
					},
					{
						content: <T>{lang.all.no}</T>,
						onClick: cancelRemoveNote,
					},
				]}
			/>
		</S.NotesPage>
	);
};

import * as S from "./NotesPage.styles";
import { useNavigator } from "@src/components/navigator/hooks/UseNavigator";
import { Navigator } from "@src/components/navigator/Navigator";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { useState } from "react";
import { NotesContent } from "./components/NotesContent/NotesContent";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Modal } from "@src/components/modal/Modal";
import { useNotesStore } from "../store/UseNotesStore";
import { Text } from "@src/components/text/Text";

export const NotesPage = () => {
	const pager = useNavigator();
	const notes = useNotesStore();
	const [noteIdToRemove, setNoteIdToRemove] = useState("");

	const handleOnClickNote = (noteId: string) => {
		const note = notes.data[noteId];

		pager.pushPage(
			<Navigator.Page id={String(note.id)} title={note.title}>
				<NotesContent id={note.id} title={note.title} text={note.text} />
			</Navigator.Page>
		);
	};

	const handleOnClickAddNote = () => {
		const newNotes = structuredClone(notes.data);
		const date = new Date();
		const id = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

		newNotes[id] = {
			id: id,
			title: "My Note " + id,
			text: "Text",
		};

		notes.setNote(id, newNotes[id].title, newNotes[id].text);
	};

	const handleOnClickRemoveNote = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, noteId: string) => {
		e.stopPropagation();
		setNoteIdToRemove(noteId);
	};

	const performRemoveNote = () => {
		const newNotes = structuredClone(notes.data);
		delete newNotes[noteIdToRemove];
		notes.setNotes(newNotes);
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
				{Object.keys(notes.data).map((noteId) => (
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
							<Text>{notes.data[noteId].title}</Text>
						</S.CellGrid>
					</List.Cell>
				))}
			</List>

			<Modal
				isVisible={noteIdToRemove !== ""}
				iconName="question"
				text={<T>{lang.misc.areYouSure}</T>}
				onClickBackground={cancelRemoveNote}
				buttonContentA={<T>{lang.misc.yes}</T>}
				buttonCallbackA={performRemoveNote}
				buttonContentB={<T>{lang.misc.no}</T>}
				buttonCallbackB={cancelRemoveNote}
			/>
		</S.NotesPage>
	);
};

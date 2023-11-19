import * as S from "./NotesPage.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { Pager } from "@src/components/pager/Pager";
import { List } from "@src/components/list/List";
import { Icon } from "@src/icons/Icon";
import { useState } from "react";
import { NotesContent } from "./components/NotesContent/NotesContent";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Modal } from "@src/components/modal/Modal";

const noteId = {
	id: 0,

	get getId() {
		this.id++;
		return this.id;
	},
};

interface INote {
	id: string;
	title: string;
	text: string;
}

export const NotesPage = () => {
	const pager = usePager();
	const [notes, setNotes] = useState<{ [K in string]: INote }>({});
	const [noteIdToRemove, setNoteIdToRemove] = useState("");

	const handleOnClickNote = (noteId: string) => {
		const note = notes[noteId];

		pager.pushPage(
			<Pager.Page id={String(note.id)} title={note.title}>
				<NotesContent>{note.text}</NotesContent>
			</Pager.Page>
		);
	};

	const handleOnClickAddNote = () => {
		const newNotes = structuredClone(notes);

		newNotes[noteId.getId] = {
			id: String(noteId.id),
			title: "Untitled " + String(noteId.id),
			text: "Text",
		};

		setNotes(newNotes);
	};

	const handleOnClickRemoveNote = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, noteId: string) => {
		event.stopPropagation();

		setNoteIdToRemove(noteId);
	};

	const performRemoveNote = () => {
		const newNotes = structuredClone(notes);
		delete newNotes[noteIdToRemove];
		setNotes(newNotes);
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
				{Object.keys(notes)
					.sort()
					.map((noteId) => (
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
								<T>{notes[noteId].title}</T>
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

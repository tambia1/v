import * as S from "./NotesPage.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { Pager } from "@src/components/pager/Pager";
import { List } from "@src/components/list/List";
import { useLanguage } from "@src/language/UseLanguage";
import { Lang } from "@src/language/Lang";
import { Icon } from "@src/icons/Icon";
import { useState } from "react";
import { NotesContent } from "./components/NotesContent/NotesContent";
import { Text } from "@src/components/text/Text";

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
	const { lang } = useLanguage();
	const [notes, setNotes] = useState<{ [K in string]: INote }>({});

	const handleOnClickNote = (noteId: string) => {
		const note = notes[noteId];

		pager.pushPage(
			<Pager.Page id={String(note.id)} title={note.title}>
				<NotesContent>
					<Text size="m">{note.text}</Text>
				</NotesContent>
			</Pager.Page>
		);
	};

	const handleOnClickAddNote = () => {
		const newNotes = structuredClone(notes);

		newNotes[noteId.getId] = {
			id: String(noteId.id),
			title: "Title",
			text: "Text",
		};

		setNotes(newNotes);
	};

	const handleOnClickRemoveNote = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, noteId: string) => {
		event.stopPropagation();

		const newNotes = structuredClone(notes);

		delete newNotes[noteId];

		setNotes(newNotes);
	};

	return (
		<S.NotesPage>
			<List.Section>
				<S.CellGrid>
					<Icon iconName="iconPlusCircle" onClick={handleOnClickAddNote} />
					<Lang>{lang.notes.notes}</Lang>
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
								<Lang>{noteId}</Lang>
							</S.CellGrid>
						</List.Cell>
					))}
			</List>
		</S.NotesPage>
	);
};
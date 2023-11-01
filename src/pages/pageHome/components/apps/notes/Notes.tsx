import React, { useEffect } from "react";
import * as S from "./Notes.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { Pager } from "@src/components/pager/Pager";
import { List } from "@src/components/list/List";
import { useLanguage } from "@src/language/UseLanguage";
import { Lang } from "@src/language/Lang";
import { Icon } from "@src/icons/Icon";
import { useState } from "react";

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

export const Notes = () => {
	const pager = usePager();
	const { lang } = useLanguage();
	const [notes, setNotes] = useState<{ [K in string]: INote }>({});

	useEffect(() => {
		pager.listenToPushStart("aaa", () => {
			console.log("AAA", pager.pages.length);
		});

		pager.listenToPushEnd("bbb", () => {
			console.log("BBB", pager.pages.length);
		});
	}, []);

	const handleOnClickNote = (noteId: string) => {
		const note = notes[noteId];

		pager.pushPage(
			<Pager.Page id={String(note.id)} title={note.title}>
				<div>{note.text}</div>
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
		<S.Settings>
			<List.Section>
				<S.CellGrid>
					<Icon iconName="plusCircle" onClick={handleOnClickAddNote} />
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
									iconName="minusCircle"
									onClick={(e) => {
										handleOnClickRemoveNote(e, noteId);
									}}
								/>
								<Lang>{noteId}</Lang>
							</S.CellGrid>
						</List.Cell>
					))}
			</List>
		</S.Settings>
	);
};

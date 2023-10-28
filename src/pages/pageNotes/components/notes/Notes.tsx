import * as S from "./Notes.styles";
import { usePager } from "@src/components/pager/hooks/UsePager";
import { Pager } from "@src/components/pager/Pager";
import { List } from "@src/components/list/List";
import { useLanguage } from "@src/language/UseLanguage";
import { Lang } from "@src/language/Lang";
import { Icon } from "@src/icons/Icon";
import { useState } from "react";

export const Notes = () => {
	const pager = usePager();
	const { lang } = useLanguage();
	const [notes, setNotes] = useState<{ [K in string]: string }>({
		note_0: "hi 0",
		note_1: "hi 1",
		note_2: "hi 2",
	});

	const handleOnClickAddFolder = () => {
		const newNotes = structuredClone(notes);

		newNotes[`note_${Object.keys(notes).length}`] = `hi ${Object.keys(notes).length}`;

		setNotes(newNotes);
	};

	const handleOnClickFolder = (note: string) => {
		pager.pushPage(
			<Pager.Page id={note} title={note}>
				<div>{notes[note]}</div>
			</Pager.Page>
		);
	};

	return (
		<S.Settings>
			<List.Section>
				<S.Folders>
					<Lang>{lang.notes.folders}</Lang>
					<Icon iconName="plusCircle" onClick={handleOnClickAddFolder} />
				</S.Folders>
			</List.Section>

			<List>
				{Object.keys(notes)
					.sort()
					.map((note) => (
						<List.Cell
							onClick={() => {
								handleOnClickFolder(note);
							}}
						>
							<Lang>{note}</Lang>
						</List.Cell>
					))}
			</List>
		</S.Settings>
	);
};

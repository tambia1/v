import * as S from "./PageNotes.styles";
import { Pager } from "@src/components/pager/Pager";
import { useLanguage } from "@src/language/UseLanguage";
import { Notes } from "./components/notes/Notes";

export const PageNotes = () => {
	const { lang } = useLanguage();

	return (
		<S.PageNotes>
			<Pager>
				<Pager.Page id="notes" title={lang.notes.title}>
					<Notes />
				</Pager.Page>
			</Pager>
		</S.PageNotes>
	);
};

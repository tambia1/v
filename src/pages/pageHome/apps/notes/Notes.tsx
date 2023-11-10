import * as S from "./Notes.styles";
import { Pager } from "@src/components/pager/Pager";
import { Lang } from "@src/language/Lang";
import { useLanguage } from "@src/language/UseLanguage";
import { NotesPage } from "./page/NotesPage";

export const Notes = () => {
	const { lang } = useLanguage();
	return (
		<S.Notes>
			<Pager>
				<Pager.Page id="app" title={<Lang>{lang.notes.title}</Lang>}>
					<NotesPage />
				</Pager.Page>
			</Pager>
		</S.Notes>
	);
};

import * as S from "./Notes.styles";
import { Pager } from "@src/components/pager/Pager";
import { NotesPage } from "./page/NotesPage";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const Notes = () => {
	return (
		<S.Notes>
			<Pager>
				<Pager.Page id="app" title={<T>{lang.notes.title}</T>}>
					<NotesPage />
				</Pager.Page>
			</Pager>
		</S.Notes>
	);
};

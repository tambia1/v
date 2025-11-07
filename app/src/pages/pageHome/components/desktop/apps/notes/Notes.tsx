import { Navigator } from "@src/components/navigator/Navigator";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import * as S from "./Notes.styles";
import { NotesPage } from "./pages/NotesPage";

export const Notes = () => {
	return (
		<S.Notes>
			<Navigator>
				<Navigator.Page id="app" title={<T>{lang.notes.title}</T>}>
					<NotesPage />
				</Navigator.Page>
			</Navigator>
		</S.Notes>
	);
};

import * as S from "./Notes.styles";
import { Navigator } from "@src/components/navigator/Navigator";
import { NotesPage } from "./pages/NotesPage";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

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

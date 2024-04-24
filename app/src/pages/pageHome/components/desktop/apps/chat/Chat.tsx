import { Navigator } from "@src/components/navigator/Navigator";
import * as S from "./Chat.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Name } from "./components/name/Name";

export const Chat = () => {
	return (
		<S.Chat>
			<Navigator>
				<Navigator.Page id="app" title={<T>{lang.chat.title}</T>}>
					<Name />
				</Navigator.Page>
			</Navigator>
		</S.Chat>
	);
};

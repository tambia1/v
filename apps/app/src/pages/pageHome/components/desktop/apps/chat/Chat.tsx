import { Navigator } from "@src/components/navigator/Navigator";
import * as S from "./Chat.styles";
import { Pages } from "./pages/Page";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";

export const Chat = () => {
	return (
		<S.Chat>
			<Navigator>
				<Navigator.Page id="app" title={<T>{lang.chat.title}</T>}>
					<Pages />
				</Navigator.Page>
			</Navigator>
		</S.Chat>
	);
};

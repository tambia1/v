import { Navigator } from "@src/components/navigator/Navigator";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import * as S from "./Chat.styles";
import { User } from "./components/user/User";

export const Chat = () => {
	return (
		<S.Chat>
			<Navigator>
				<Navigator.Page id="app" title={<T>{lang.chat.title}</T>}>
					<User />
				</Navigator.Page>
			</Navigator>
		</S.Chat>
	);
};

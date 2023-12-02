import * as S from "./Login.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Login = () => {
	const { t } = useTranslation();
	const [state, setState] = useState<"button" | "loader">("button");

	const handleOnClickLogin = () => {
		setState("loader");
	};

	return (
		<S.Login>
			<S.Box>
				<S.EmailBox>
					<S.EmailImage iconName="iconUser" />
					<S.EmailInput placeholder={t(lang.login.email)} />
				</S.EmailBox>
				<S.PasswordBox>
					<S.PasswordImage iconName="iconLock" />
					<S.PasswordInput placeholder={t(lang.login.password)} />
				</S.PasswordBox>
				<S.ButtonBox>
					{state === "loader" && <S.Loader iconName="iconLoader" />}
					{state === "button" && (
						<S.ButtonLogin onClick={handleOnClickLogin}>
							<T>{lang.login.button}</T>
						</S.ButtonLogin>
					)}
				</S.ButtonBox>
			</S.Box>
		</S.Login>
	);
};

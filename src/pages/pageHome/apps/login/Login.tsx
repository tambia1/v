import * as S from "./Login.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { QueryLogin } from "@src/queries/QueryLogin";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Login = () => {
	const { t } = useTranslation();
	const [state, setState] = useState<"idle" | "loader" | "check" | "error">("idle");
	const queryLogin = QueryLogin.performLogin({ enabled: true });

	const handleOnClickLogin = async () => {
		setState("loader");

		await queryLogin.refetch();

		if (queryLogin.data?.error === 0) {
			setState("check");
		} else {
			setState("error");
		}
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
					{state === "check" && <S.Check iconName="iconCheck" />}
					{state === "error" && <S.Error iconName="iconX" />}
				</S.ButtonBox>
				<S.ButtonBox>
					<S.ButtonLogin onClick={handleOnClickLogin}>
						<T>{lang.login.button}</T>
					</S.ButtonLogin>
				</S.ButtonBox>
			</S.Box>
		</S.Login>
	);
};

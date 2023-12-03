import * as S from "./Login.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { QueryLogin } from "@src/queries/QueryLogin";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Login = () => {
	const { t } = useTranslation();
	const [state, setState] = useState<"idle" | "loader" | "logged-in" | "logged-out">("idle");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const queryLogin = QueryLogin.performLogin({ email: email, password: password }, { enabled: true });
	const queryLogout = QueryLogin.performLogout({ enabled: true });

	const handleOnClickLogin = async () => {
		setState("loader");

		await queryLogin.refetch();

		if (queryLogin.data?.error === 0) {
			setState("logged-in");
		} else {
			setState("logged-out");
		}
	};

	const handleOnClickLogout = async () => {
		setState("loader");

		await queryLogout.refetch();

		if (queryLogin.data?.error === 0) {
			setState("logged-in");
		} else {
			setState("logged-out");
		}
	};

	return (
		<S.Login>
			<S.Box>
				<S.EmailBox>
					<S.EmailImage iconName="iconUser" />
					<S.EmailInput placeholder={t(lang.login.email)} onChange={(e) => setEmail(e.target.value)} />
				</S.EmailBox>
				<S.PasswordBox>
					<S.PasswordImage iconName="iconLock" />
					<S.PasswordInput placeholder={t(lang.login.password)} onChange={(e) => setPassword(e.target.value)} />
				</S.PasswordBox>
				<S.ButtonBox>
					{state === "loader" && <S.Loader iconName="iconLoader" />}
					{state === "logged-in" && <S.Check iconName="iconCheck" />}
					{state === "logged-out" && <S.Error iconName="iconX" />}
				</S.ButtonBox>
				<S.ButtonBox>
					{state !== "logged-in" && (
						<S.ButtonLogin onClick={handleOnClickLogin}>
							<T>{lang.login.buttonLogin}</T>
						</S.ButtonLogin>
					)}
					{state === "logged-in" && (
						<S.ButtonLogout onClick={handleOnClickLogout}>
							<T>{lang.login.buttonLogout}</T>
						</S.ButtonLogout>
					)}
				</S.ButtonBox>
			</S.Box>
		</S.Login>
	);
};

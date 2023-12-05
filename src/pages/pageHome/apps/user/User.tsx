import * as S from "./User.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { QueryLogin } from "@src/queries/QueryLogin";
import { useStoreLogin } from "@src/stores/StoreLogin";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const User = () => {
	const { t } = useTranslation();
	const [state, setState] = useState<"idle" | "loader">("idle");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const queryLogin = QueryLogin.performLogin({ email: email, password: password }, { enabled: true });
	const queryLogout = QueryLogin.performLogout({ enabled: true });
	const storeLogin = useStoreLogin();

	console.log("aaa", storeLogin.token);

	const handleOnClickLogin = async () => {
		setState("loader");
		await queryLogin.refetch();
		setState("idle");

		if (queryLogin.data && queryLogin.data.token !== "") {
			storeLogin.setToken(queryLogin.data.token);
		} else {
			storeLogin.setToken("");
		}
	};

	const handleOnClickLogout = async () => {
		setState("loader");
		await queryLogout.refetch();
		setState("idle");

		if (queryLogin.data?.error === 0) {
			storeLogin.setToken("");
		}
	};

	return (
		<S.User>
			<S.Box>
				<S.UserImage $logState={storeLogin.token === "" ? "loggedOut" : "loggedIn"} />
				<S.EmailBox>
					<S.EmailImage iconName="iconUser" />
					<S.EmailInput placeholder={t(lang.user.email)} onChange={(e) => setEmail(e.target.value)} />
				</S.EmailBox>
				<S.PasswordBox>
					<S.PasswordImage iconName="iconLock" />
					<S.PasswordInput placeholder={t(lang.user.password)} onChange={(e) => setPassword(e.target.value)} />
				</S.PasswordBox>
				<S.ButtonBox>{state === "loader" && <S.Loader iconName="iconLoader" />}</S.ButtonBox>
				<S.ButtonBox>
					{storeLogin.token === "" && (
						<S.ButtonLogin onClick={handleOnClickLogin}>
							<T>{lang.user.login}</T>
						</S.ButtonLogin>
					)}
					{storeLogin.token !== "" && (
						<S.ButtonLogout onClick={handleOnClickLogout}>
							<T>{lang.user.logout}</T>
						</S.ButtonLogout>
					)}
				</S.ButtonBox>
			</S.Box>
		</S.User>
	);
};

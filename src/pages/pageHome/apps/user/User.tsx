import * as S from "./User.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { QueryLogin } from "@src/queries/QueryLogin";
import { QueryUser } from "@src/queries/QueryUser";
import { useStoreLogin } from "@src/stores/StoreLogin";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const User = () => {
	const { t } = useTranslation();
	const [state, setState] = useState<"idle" | "loader">("idle");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const mutateLogin = QueryLogin.mutateLogin({
		onSuccess: () => {
			queryUser.refetch();
		},
	});
	const mutateLogout = QueryLogin.mutateLogout({
		onSuccess: () => {
			queryUser.refetch();
		},
	});
	const storeLogin = useStoreLogin();
	const queryUser = QueryUser.queryUser({ token: storeLogin.token });

	const handleOnClickLogin = async () => {
		setState("loader");
		const mutateResult = await mutateLogin({ email: email, password: password });
		setState("idle");

		if (mutateResult.error === 0) {
			storeLogin.setToken(mutateResult.token);
		} else {
			storeLogin.setToken("");
		}
	};

	const handleOnClickLogout = async () => {
		setState("loader");
		const mutateResult = await mutateLogout({ token: storeLogin.token });
		setState("idle");

		if (mutateResult.error === 0) {
			storeLogin.setToken("");
			setEmail("");
			setPassword("");
		}
	};

	return (
		<S.User>
			<S.Box>
				<S.UserImage $logState={storeLogin.token === "" ? "loggedOut" : "loggedIn"} />
				<S.EmailBox>
					<S.EmailImage iconName="iconUser" />
					<S.EmailInput placeholder={t(lang.user.email)} onChange={(e) => setEmail(e.target.value)} value={email} disabled={!!storeLogin.token} />
				</S.EmailBox>
				<S.PasswordBox>
					<S.PasswordImage iconName="iconLock" />
					<S.PasswordInput placeholder={t(lang.user.password)} onChange={(e) => setPassword(e.target.value)} value={password} disabled={!!storeLogin.token} />
				</S.PasswordBox>
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
				<S.ButtonBox>
					{state === "loader" ? (
						<S.Loader iconName="iconLoader" />
					) : (
						<>
							{queryUser.isLoading && <S.Idle>Loading...</S.Idle>}
							{queryUser.data?.error === 0 && <S.Success>{t(lang.user.welcome, { firstName: queryUser.data?.firstName, lastName: queryUser.data?.lastName })}</S.Success>}
							{queryUser.data?.error !== 0 && <S.Error>{queryUser.data?.message}</S.Error>}
						</>
					)}
				</S.ButtonBox>
			</S.Box>
		</S.User>
	);
};

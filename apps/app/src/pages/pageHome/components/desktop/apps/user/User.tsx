import * as S from "./User.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { QueryLogin } from "@apps/user/queries/QueryLogin";
import { QueryUser } from "@apps/user/queries/QueryUser";
import { useStoreLogin } from "@apps/user/stores/StoreLogin";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Promises } from "@src/services/Promises";
import { useBar } from "./../../hooks/UseBar";

export const User = () => {
	const { t } = useTranslation();

	const [data, setData] = useState({
		email: {
			value: "",
			disabled: false,
		},
		password: {
			value: "",
			disabled: false,
		},
	});

	const [message, setMessage] = useState<{ state: "" | "idle" | "error" | "success"; message: string }>({ state: "", message: "" });
	const bar = useBar();

	const [loaderState, setLoaderState] = useState<"idle" | "loader">("idle");

	const mutateLogin = QueryLogin.login({
		onSuccess: () => {
			refetchQueryUser();
		},
	});

	const mutateLogout = QueryLogin.logout({
		onSuccess: () => {
			refetchQueryUser();
		},
	});

	const storeLogin = useStoreLogin();
	const queryUser = QueryUser.queryUser({ token: storeLogin.token }, { enabled: !!storeLogin.token });

	useEffect(() => {
		if (!storeLogin.token) {
			setMessage({ state: "", message: "" });

			return;
		}

		if (queryUser.isLoading) {
			setMessage({ state: "idle", message: "Loading user data..." });

			return;
		}

		if (queryUser.data?.error !== 0) {
			setMessage({ state: "error", message: t(lang.user.welcome) });

			return;
		}

		if (queryUser.data?.firstName && queryUser.data?.lastName) {
			setMessage({ state: "success", message: t(lang.user.welcome, { firstName: queryUser.data?.firstName, lastName: queryUser.data?.lastName }) });

			Promises.sleep(1500).then(() => {
				bar.onClickclose();
			});

			return;
		}
	}, [queryUser.isLoading, storeLogin.token]);

	const handleOnClickBackground = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target !== e.currentTarget) {
			return;
		}

		bar.onClickclose();
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, email: { ...data.email, value: e.target.value } });
		setMessage({ state: "", message: "" });
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData({ ...data, password: { ...data.password, value: e.target.value } });
		setMessage({ state: "", message: "" });
	};

	const refetchQueryUser = () => {
		if (storeLogin.token) {
			queryUser.refetch();
		}
	};

	const handleOnClickLogin = async () => {
		if (!data.email.value || !data.password.value) {
			setMessage({ state: "error", message: "Invalid name or password" });

			return;
		}

		setLoaderState("loader");
		const mutateResult = await mutateLogin({ email: data.email.value, password: data.password.value });
		setLoaderState("idle");

		if (mutateResult.error === 0) {
			storeLogin.setData(mutateResult.token, mutateResult.role);
		} else {
			storeLogin.setData("", "guest");
			setMessage({ state: "error", message: "Invalid name or password" });
		}
	};

	const handleOnClickLogout = async () => {
		setLoaderState("loader");
		const mutateResult = await mutateLogout({ token: storeLogin.token });
		setLoaderState("idle");

		if (mutateResult.error === 0) {
			storeLogin.setData("", "guest");
			setData({ ...data, email: { ...data.email, value: "" }, password: { ...data.password, value: "" } });
		}
	};

	return (
		<S.User onClick={handleOnClickBackground}>
			<S.Box>
				<S.UserImage $logState={storeLogin.token === "" ? "loggedOut" : "loggedIn"} />
				<S.EmailBox>
					<S.EmailImage iconName="iconUser" />
					<S.EmailInput type="text" placeholder={t(lang.user.email)} onChange={handleEmailChange} value={data.email.value} disabled={!!storeLogin.token} />
				</S.EmailBox>
				<S.PasswordBox>
					<S.PasswordImage iconName="iconLock" />
					<S.PasswordInput type="password" placeholder={t(lang.user.password)} onChange={handlePasswordChange} value={data.password.value} disabled={!!storeLogin.token} />
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
					{loaderState === "loader" ? (
						<S.Loader iconName="iconLoader" />
					) : (
						<>
							{message.state === "idle" && <S.Idle>{message.message}</S.Idle>}
							{message.state === "error" && <S.Error>{message.message}</S.Error>}
							{message.state === "success" && <S.Success>{message.message}</S.Success>}
						</>
					)}
				</S.ButtonBox>
				<S.Notes>
					<span>a, a</span>
					<span>b, b</span>
				</S.Notes>
			</S.Box>
		</S.User>
	);
};
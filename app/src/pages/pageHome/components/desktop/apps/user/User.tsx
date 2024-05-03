import * as S from "./User.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { QueryLogin } from "@apps/user/queries/QueryLogin";
import { QueryUser } from "@apps/user/queries/QueryUser";
import { useStoreLogin } from "@apps/user/stores/StoreLogin";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBarMain } from "../../hooks/UseBarMain";
import { Loader } from "@src/components/loader/Loader";
import { z } from "zod";
import { useGoogleLogin } from "@react-oauth/google";

export const User = () => {
	const { t } = useTranslation();

	const barMain = useBarMain();

	const [inputData, setInputData] = useState({
		email: {
			value: "",
			disabled: false,
		},
		password: {
			value: "",
			disabled: false,
		},
	});

	const emailSchema = z.string().min(1).max(5);
	const passwordSchema = z.string().min(1).max(5);

	const [message, setMessage] = useState<{ state: "" | "idle" | "error" | "success"; message: string }>({ state: "", message: "" });
	const [isLoading, setIsLoading] = useState(false);

	const mutateLogin = QueryLogin.login();
	const mutateLogout = QueryLogin.logout();
	const mutateToken = QueryLogin.token();

	const [isLoginPerformed, setIsLoginPerformed] = useState(false);

	const storeLogin = useStoreLogin();
	const queryUser = QueryUser.queryUser({ token: storeLogin.token }, { enabled: false });

	const performGoogleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			const token = tokenResponse.access_token;

			setIsLoading(true);
			setIsLoginPerformed(true);
			const mutateResult = await mutateToken({ token });
			setIsLoading(false);

			if (mutateResult.error === 0) {
				onLoginSuccess(token);
			} else {
				onLoginError();
			}
		},
		onError: (_errorResponse) => {
			onLoginError();
		},
	});

	useEffect(() => {
		if (queryUser.isLoading) {
			setMessage({ state: "idle", message: t(lang.user.loading) });

			return;
		}

		if (queryUser.data?.error === 0) {
			setMessage({ state: "success", message: t(lang.user.welcome, { firstName: queryUser.data.firstName, lastName: queryUser.data.lastName }) });

			storeLogin.setRole(queryUser.data.role);

			if (isLoginPerformed) {
				setTimeout(barMain.onClickClose, 1000);
			}

			return;
		}
	}, [queryUser.isLoading, queryUser.data?.error, isLoginPerformed]);

	const handleOnClickBackground = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target !== e.currentTarget) {
			return;
		}

		barMain.onClickClose();
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({ ...inputData, email: { ...inputData.email, value: e.target.value } });
		setMessage({ state: "", message: "" });
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({ ...inputData, password: { ...inputData.password, value: e.target.value } });
		setMessage({ state: "", message: "" });
	};

	const handleOnClickDirectLogin = async () => {
		const emailSchemaResult = emailSchema.safeParse(inputData.email.value);
		const passwordSchemaResult = passwordSchema.safeParse(inputData.password.value);

		if (!emailSchemaResult.success || !passwordSchemaResult.success) {
			setMessage({ state: "error", message: "Invalid name or password" });

			return;
		}

		setIsLoading(true);
		setIsLoginPerformed(true);
		const mutateResult = await mutateLogin({ email: inputData.email.value, password: inputData.password.value });
		setIsLoading(false);

		if (mutateResult.error === 0) {
			onLoginSuccess(mutateResult.token);
		} else {
			onLoginError();
		}
	};

	const handleOnClickLogout = async () => {
		setMessage({ state: "idle", message: "" });

		storeLogin.setToken("");
		storeLogin.setRole("guest");

		mutateLogout({ token: storeLogin.token });

		setInputData({ ...inputData, email: { ...inputData.email, value: "", disabled: false }, password: { ...inputData.password, value: "", disabled: false } });
	};

	const handleGoogleLogin = () => {
		performGoogleLogin();
	};

	const onLoginSuccess = (token: string) => {
		storeLogin.setToken(token);
		queryUser.refetch();
	};

	const onLoginError = () => {
		storeLogin.setToken("");
		storeLogin.setRole("guest");
		setMessage({ state: "error", message: "Invalid name or password" });
	};

	return (
		<S.User onClick={handleOnClickBackground}>
			<S.Box>
				<S.UserImage $logState={storeLogin.token === "" ? "loggedOut" : "loggedIn"} />

				<S.EmailBox disabled={!!storeLogin.token || isLoading}>
					<S.EmailImage iconName="iconUser" />
					<S.EmailInput
						type="text"
						placeholder={t(lang.user.email) + " (a, b)"}
						onChange={handleEmailChange}
						value={inputData.email.value}
						disabled={!!storeLogin.token || isLoading}
						autoComplete="off"
					/>
				</S.EmailBox>

				<S.PasswordBox disabled={!!storeLogin.token || isLoading}>
					<S.PasswordImage iconName="iconLock" />
					<S.PasswordInput
						type="password"
						placeholder={t(lang.user.password) + " (a, b)"}
						onChange={handlePasswordChange}
						value={inputData.password.value}
						disabled={!!storeLogin.token || isLoading}
						autoComplete="off"
					/>
				</S.PasswordBox>

				<S.GoogleBox disabled={!!storeLogin.token || isLoading}>
					<S.GoogleImage iconName="iconGoogle" onClick={handleGoogleLogin} />
				</S.GoogleBox>

				<S.ButtonBox>
					{storeLogin.token === "" && (
						<S.ButtonLogin onClick={handleOnClickDirectLogin} disabled={isLoading}>
							<T>{lang.user.login}</T>
						</S.ButtonLogin>
					)}
					{storeLogin.token !== "" && (
						<S.ButtonLogout onClick={handleOnClickLogout} disabled={isLoading}>
							<T>{lang.user.logout}</T>
						</S.ButtonLogout>
					)}
				</S.ButtonBox>

				<S.MessagesBox>
					{isLoading && <Loader />}

					{message.state === "idle" && <S.Idle>{message.message}</S.Idle>}
					{message.state === "error" && <S.Error>{message.message}</S.Error>}
					{message.state === "success" && <S.Success>{message.message}</S.Success>}
				</S.MessagesBox>
			</S.Box>
		</S.User>
	);
};

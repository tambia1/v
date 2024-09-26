import * as S from "./User.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { QueryLogin } from "@apps/user/queries/QueryLogin";
import { QueryUser } from "@apps/user/queries/QueryUser";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "@src/components/loader/Loader";
import { z } from "zod";
import { useGoogleLogin } from "@react-oauth/google";
import { StoreUser } from "./stores/StoreUser";

export const User = () => {
	const { t } = useTranslation();

	const [inputData, setInputData] = useState({
		email: {
			value: "a",
			disabled: false,
		},
		password: {
			value: "a",
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

	const storeUser = StoreUser();
	const queryUser = QueryUser.queryUser({ token: storeUser.token }, { enabled: false });

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

			if (isLoginPerformed) {
				// setTimeout(barMain.onClickClose, 1000);
			}

			return;
		}
	}, [queryUser.isLoading, queryUser.data?.error, isLoginPerformed]);

	const handleOnClickBackground = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target !== e.currentTarget) {
			return;
		}

		// barMain.onClickClose();
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

		storeUser.setToken("");

		mutateLogout({ token: storeUser.token });

		setInputData({ ...inputData, email: { ...inputData.email, value: "", disabled: false }, password: { ...inputData.password, value: "", disabled: false } });
	};

	const handleGoogleLogin = () => {
		performGoogleLogin();
	};

	const onLoginSuccess = (token: string) => {
		storeUser.setToken(token);
		queryUser.refetch();
	};

	const onLoginError = () => {
		storeUser.setToken("");
		setMessage({ state: "error", message: "Invalid name or password" });
	};

	return (
		<S.User onClick={handleOnClickBackground}>
			<S.Box>
				<S.UserImage $logState={storeUser.token === "" ? "loggedOut" : "loggedIn"} />

				<S.EmailBox disabled={!!storeUser.token || isLoading}>
					<S.EmailImage iconName="iconUser" />
					<S.EmailInput
						type="text"
						placeholder={t(lang.user.email) + " (a, b)"}
						onChange={handleEmailChange}
						value={inputData.email.value}
						disabled={!!storeUser.token || isLoading}
						autoComplete="off"
					/>
				</S.EmailBox>

				<S.PasswordBox disabled={!!storeUser.token || isLoading}>
					<S.PasswordImage iconName="iconLock" />
					<S.PasswordInput
						type="password"
						placeholder={t(lang.user.password) + " (a, b)"}
						onChange={handlePasswordChange}
						value={inputData.password.value}
						disabled={!!storeUser.token || isLoading}
						autoComplete="off"
					/>
				</S.PasswordBox>

				<S.ButtonBox>
					{storeUser.token === "" && (
						<S.ButtonLogin onClick={handleOnClickDirectLogin} disabled={isLoading}>
							<T>{lang.user.login}</T>
						</S.ButtonLogin>
					)}
					{storeUser.token !== "" && (
						<S.ButtonLogout onClick={handleOnClickLogout} disabled={isLoading}>
							<T>{lang.user.logout}</T>
						</S.ButtonLogout>
					)}
				</S.ButtonBox>

				<S.SocialLoginleBox disabled={!!storeUser.token || isLoading}>
					<S.SocialLoginImage iconName="iconGoogle" onClick={handleGoogleLogin} />
					<S.SocialLoginImage iconName="iconFacebook" onClick={handleGoogleLogin} />
					<S.SocialLoginImage iconName="iconMicrosoft" onClick={handleGoogleLogin} />
					<S.SocialLoginImage iconName="iconApple" onClick={handleGoogleLogin} />
				</S.SocialLoginleBox>

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

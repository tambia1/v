import { Button } from "@components/button/Button";
import { useGoogleLogin } from "@react-oauth/google";
import { Loader } from "@src/components/loader/Loader";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { StoreUser } from "@src/pages/pageHome/components/desktop/apps/user/stores/StoreUser";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useBarMain } from "../../hooks/UseBarMain";
import * as S from "./User.styles";
import type { Message } from "./User.types";
import { Api } from "./api/Api";

export const User = () => {
	const { t } = useTranslation();

	const barMain = useBarMain();

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

	const storeUser = StoreUser();
	const queryUser = Api.user.queryUser({ token: storeUser.token });
	const mutateLogin = Api.login.mutateLogin();
	const mutateLogout = Api.login.mutateLogout();
	const mutateToken = Api.login.mutateToken();

	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<Message>({ state: "idle", message: "" });
	const [timeoutExit, setTimeoutExit] = useState<NodeJS.Timeout>();

	useEffect(() => {
		if (storeUser.token && queryUser.data) {
			setMessage({ state: "success", message: t(lang.user.welcome, { firstName: queryUser.data.firstName, lastName: queryUser.data.lastName }) });

			storeUser.setRole(queryUser.data.role);
		}
	}, [storeUser.token, storeUser.setRole, queryUser.data, t]);

	const handleOnClickBackground = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target !== e.currentTarget) {
			return;
		}

		barMain.onClickClose();
	};

	const handleEmailChange = (value: string) => {
		setInputData({ ...inputData, email: { ...inputData.email, value } });
		setMessage({ state: "idle", message: "" });
	};

	const handlePasswordChange = (value: string) => {
		setInputData({ ...inputData, password: { ...inputData.password, value } });
		setMessage({ state: "idle", message: "" });
	};

	const handlePasswordPressEnter = () => {
		handleOnClickDirectLogin();
	};

	const handleOnClickDirectLogin = async () => {
		const emailSchemaResult = emailSchema.safeParse(inputData.email.value);
		const passwordSchemaResult = passwordSchema.safeParse(inputData.password.value);

		if (!emailSchemaResult.success || !passwordSchemaResult.success) {
			setMessage({ state: "error", message: t(lang.user.error) });

			return;
		}

		setIsLoading(true);
		const mutateResult = await mutateLogin({ email: inputData.email.value, password: inputData.password.value });
		setIsLoading(false);

		if (mutateResult.error === 0) {
			onLoginSuccess(mutateResult.token);
		} else {
			onLoginError();
		}
	};

	const handleOnClickLogout = async () => {
		clearTimeout(timeoutExit);

		storeUser.setToken("");
		storeUser.setRole("guest");

		setMessage({ state: "idle", message: "" });

		mutateLogout({ token: storeUser.token });

		setInputData({ ...inputData, email: { ...inputData.email, value: "", disabled: false }, password: { ...inputData.password, value: "", disabled: false } });
	};

	const onLoginSuccess = async (token: string) => {
		storeUser.setToken(token);
		queryUser.refetch();

		setMessage({ state: "idle", message: t(lang.user.loading) });

		const timeout = setTimeout(barMain.onClickClose, 1000);
		setTimeoutExit(timeout);
	};

	const onLoginError = () => {
		storeUser.setToken("");
		storeUser.setRole("guest");
		setMessage({ state: "error", message: t(lang.user.error) });
	};

	const handleGoogleLogin = () => {
		performGoogleLogin();
	};

	const performGoogleLogin = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			const token = tokenResponse.access_token;

			setIsLoading(true);
			const mutateTokenResult = await mutateToken({ token });
			setIsLoading(false);

			if (mutateTokenResult.error === 0) {
				onLoginSuccess(token);
			} else {
				onLoginError();
			}
		},
		onError: (_errorResponse) => {
			onLoginError();
		},
	});

	return (
		<S.User onClick={handleOnClickBackground}>
			<S.Box>
				<S.UserImage $logState={storeUser.token === "" ? "loggedOut" : "loggedIn"} />

				<S.EmailBox disabled={!!storeUser.token || isLoading}>
					<S.EmailImage iconName="iconUser" />
					<S.EmailInput
						type="text"
						placeholder={`${t(lang.user.email)} (a, b)`}
						onTextChange={handleEmailChange}
						value={inputData.email.value}
						disabled={!!storeUser.token || isLoading}
						autoComplete="off"
					/>
				</S.EmailBox>

				<S.PasswordBox disabled={!!storeUser.token || isLoading}>
					<S.PasswordImage iconName="iconLock" />
					<S.PasswordInput
						type="password"
						placeholder={`${t(lang.user.password)} (a, b)`}
						onTextChange={handlePasswordChange}
						onPressEnter={handlePasswordPressEnter}
						value={inputData.password.value}
						disabled={!!storeUser.token || isLoading}
						autoComplete="off"
					/>
				</S.PasswordBox>

				<S.ButtonBox>
					{storeUser.token === "" && (
						<Button onClick={handleOnClickDirectLogin} disabled={isLoading}>
							<T>{lang.user.login}</T>
						</Button>
					)}
					{storeUser.token !== "" && (
						<Button onClick={handleOnClickLogout} disabled={isLoading}>
							<T>{lang.user.logout}</T>
						</Button>
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

					{message.state === "idle" && <S.MessageIdle>{message.message}</S.MessageIdle>}
					{message.state === "error" && <S.MessageError>{message.message}</S.MessageError>}
					{message.state === "success" && <S.MessageSuccess>{message.message}</S.MessageSuccess>}
				</S.MessagesBox>
			</S.Box>
		</S.User>
	);
};

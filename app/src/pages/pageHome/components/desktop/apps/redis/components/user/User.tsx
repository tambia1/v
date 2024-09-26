import * as S from "./User.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "@src/components/loader/Loader";
import { z } from "zod";
import { QueryLogin } from "./queries/QueryLogin";
import { StoreUser } from "./stores/StoreUser";

export const User = () => {
	const { t } = useTranslation();

	const [inputData, setInputData] = useState({
		email: {
			value: "tambi.ashmoz.30@redis.com",
			disabled: false,
		},
		password: {
			value: "Aa123456789.",
			disabled: false,
		},
	});

	const emailSchema = z.string().min(1).max(100);
	const passwordSchema = z.string().min(1).max(100);

	const [message, setMessage] = useState<{ state: "" | "idle" | "error" | "success"; message: string }>({ state: "", message: "" });
	const [isLoading, setIsLoading] = useState(false);

	const mutateLogin = QueryLogin.login();

	const storeUser = StoreUser();

	const handleOnClickDirectLogin = async () => {
		const emailSchemaResult = emailSchema.safeParse(inputData.email.value);
		const passwordSchemaResult = passwordSchema.safeParse(inputData.password.value);

		if (!emailSchemaResult.success || !passwordSchemaResult.success) {
			setMessage({ state: "error", message: "Invalid name or password" });

			return;
		}

		setIsLoading(true);

		const email = inputData.email.value;
		const password = inputData.password.value;
		const mutateResult = await mutateLogin({ email, password });

		setIsLoading(false);

		if (mutateResult.error === 0 && mutateResult.response) {
			onLoginSuccess(mutateResult.response.auth_mode);
		} else {
			onLoginError();
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({ ...inputData, email: { ...inputData.email, value: e.target.value } });
		setMessage({ state: "", message: "" });
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({ ...inputData, password: { ...inputData.password, value: e.target.value } });
		setMessage({ state: "", message: "" });
	};

	const handleOnClickLogout = async () => {
		setMessage({ state: "idle", message: "" });

		storeUser.setToken("");

		// mutateLogout({ token: storeUser.token });

		setInputData({ ...inputData, email: { ...inputData.email, value: "", disabled: false }, password: { ...inputData.password, value: "", disabled: false } });
	};

	const handleGoogleLogin = () => {};

	const onLoginSuccess = (token: string) => {
		storeUser.setToken(token);
		// queryUser.refetch();
	};

	const onLoginError = () => {
		storeUser.setToken("");
		setMessage({ state: "error", message: "Invalid name or password" });
	};

	return (
		<S.User>
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

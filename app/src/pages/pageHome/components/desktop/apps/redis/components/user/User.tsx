import { Loader } from "@src/components/loader/Loader";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import * as S from "./User.styles";
import { QueryCsrf } from "./queries/QueryCsrf";
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

	const queryLogin = QueryLogin.login();
	const queryCsrf = QueryCsrf.csrf({ enabled: message.state === "success" });

	const storeUser = StoreUser();

	useEffect(() => {
		const csrf = queryCsrf.data?.response?.csrfToken?.csrf_token || "111";

		if (message.state === "success" && csrf && !queryCsrf.isLoading) {
			storeUser.setCsrf(csrf);
		} else {
			storeUser.setCsrf("");
		}
	}, [storeUser.setCsrf, queryCsrf.data, queryCsrf.isLoading, message.state]);

	useEffect(() => {
		if (!storeUser.csrf) {
			setMessage({ state: "idle", message: "" });
		}
	}, [storeUser.csrf]);

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
		const queryLoginResult = await queryLogin({ email, password });

		setIsLoading(false);

		if (queryLoginResult.error === 0 && queryLoginResult.response) {
			setMessage({ state: "success", message: "Login success" });
		} else {
			setMessage({ state: "error", message: "Invalid name or password" });
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
		setInputData({
			...inputData,
			email: { ...inputData.email, value: "", disabled: false },
			password: { ...inputData.password, value: "", disabled: false },
		});
	};

	const handleGoogleLogin = () => {};

	return (
		<S.User>
			<S.Box>
				<S.UserImage $logState={storeUser.csrf === "" ? "loggedOut" : "loggedIn"} />

				<S.EmailBox disabled={!!storeUser.csrf || isLoading}>
					<S.EmailImage iconName="iconUser" />
					<S.EmailInput
						type="text"
						placeholder={t(lang.user.email)}
						onChange={handleEmailChange}
						value={inputData.email.value}
						disabled={!!storeUser.csrf || isLoading}
						autoComplete="off"
					/>
				</S.EmailBox>

				<S.PasswordBox disabled={!!storeUser.csrf || isLoading}>
					<S.PasswordImage iconName="iconLock" />
					<S.PasswordInput
						type="password"
						placeholder={t(lang.user.password)}
						onChange={handlePasswordChange}
						value={inputData.password.value}
						disabled={!!storeUser.csrf || isLoading}
						autoComplete="off"
					/>
				</S.PasswordBox>

				<S.ButtonBox>
					{storeUser.csrf === "" && (
						<S.ButtonLogin onClick={handleOnClickDirectLogin} disabled={isLoading}>
							<T>{lang.user.login}</T>
						</S.ButtonLogin>
					)}
					{storeUser.csrf !== "" && (
						<S.ButtonLogout onClick={handleOnClickLogout} disabled={isLoading}>
							<T>{lang.user.logout}</T>
						</S.ButtonLogout>
					)}
				</S.ButtonBox>

				<S.SocialLoginleBox disabled={!!storeUser.csrf || isLoading}>
					<S.SocialLoginImage iconName="iconGoogle" onClick={handleGoogleLogin} />
					<S.SocialLoginImage iconName="iconFacebook" onClick={handleGoogleLogin} />
					<S.SocialLoginImage iconName="iconMicrosoft" onClick={handleGoogleLogin} />
					<S.SocialLoginImage iconName="iconApple" onClick={handleGoogleLogin} />
				</S.SocialLoginleBox>

				<S.MessagesBox>
					{isLoading && <Loader />}

					{message.state === "idle" && <S.Idle>{message.message}</S.Idle>}
					{message.state === "error" && <S.ErrorMessage>{message.message}</S.ErrorMessage>}
					{message.state === "success" && <S.SuccessMessage>{message.message}</S.SuccessMessage>}
				</S.MessagesBox>
			</S.Box>
		</S.User>
	);
};

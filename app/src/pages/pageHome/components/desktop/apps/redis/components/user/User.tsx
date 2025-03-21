import { Button } from "@src/components/button/Button";
import { Loader } from "@src/components/loader/Loader";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Api } from "../../api/Api";
import * as S from "./User.styles";
import type { Message } from "./User.types";
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

	const emailSchema = z.string().min(1).max(100);
	const passwordSchema = z.string().min(1).max(100);

	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<Message>({ state: "idle", message: "" });

	const storeUser = StoreUser();
	const mutateLogin = Api.login.mutateLogin();
	const queryCsrf = Api.csrf.quryCsrf({ enabled: message.state === "success" });

	useEffect(() => {
		const csrf = queryCsrf.data?.response?.csrfToken?.csrf_token;

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
		const mutateLoginResult = await mutateLogin({ email, password });

		setIsLoading(false);

		storeUser.setLoginResponse(mutateLoginResult);

		if (mutateLoginResult.error === 0 && mutateLoginResult.response) {
			setMessage({ state: "success", message: "Login success" });
		} else {
			setMessage({ state: "error", message: "Invalid name or password" });
		}
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
						onTextChange={handleEmailChange}
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
						onTextChange={handlePasswordChange}
						onPressEnter={handlePasswordPressEnter}
						value={inputData.password.value}
						disabled={!!storeUser.csrf || isLoading}
						autoComplete="off"
					/>
				</S.PasswordBox>

				<S.ButtonBox>
					{storeUser.csrf === "" && (
						<Button onClick={handleOnClickDirectLogin} disabled={isLoading}>
							<T>{lang.user.login}</T>
						</Button>
					)}
					{storeUser.csrf !== "" && (
						<Button onClick={handleOnClickLogout} disabled={isLoading}>
							<T>{lang.user.logout}</T>
						</Button>
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

					{message.state === "idle" && <S.MessageIdle>{message.message}</S.MessageIdle>}
					{message.state === "error" && <S.MessageError>{message.message}</S.MessageError>}
					{message.state === "success" && <S.MessageSuccess>{message.message}</S.MessageSuccess>}
				</S.MessagesBox>
			</S.Box>
		</S.User>
	);
};

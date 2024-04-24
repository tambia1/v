import * as S from "./User.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { QueryLogin } from "@apps/user/queries/QueryLogin";
import { QueryUser } from "@apps/user/queries/QueryUser";
import { useStoreLogin } from "@apps/user/stores/StoreLogin";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBar } from "./../../hooks/UseBar";
import { Loader } from "@src/components/loader/Loader";
import { z } from "zod";
import { useGoogleLogin } from "@react-oauth/google";

export const User = () => {
	const { t } = useTranslation();

	const bar = useBar();

	const emailSchema = z.string().min(1).max(5);
	const passwordSchema = z.string().min(1).max(5);

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

	const [message, setMessage] = useState<{ state: "" | "idle" | "error" | "success"; message: string }>({ state: "", message: "" });
	const [isLoading, setIsLoading] = useState(false);

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

	const [isLoginPerformed, setIsLoginPerformed] = useState(false);

	const storeLogin = useStoreLogin();
	const queryUser = QueryUser.queryUser({ token: storeLogin.token }, { enabled: false });

	const performGoogleLogin = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			storeLogin.setData(tokenResponse.access_token, "user");
		},
		onError: (_errorResponse) => {
			storeLogin.setData("", "guest");
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
				setTimeout(() => {
					bar.onClickclose();
				}, 1000);
			}

			return;
		}
	}, [queryUser.isLoading, storeLogin.token, queryUser.data?.error, isLoginPerformed]);

	const handleOnClickBackground = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target !== e.currentTarget) {
			return;
		}

		bar.onClickclose();
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({ ...inputData, email: { ...inputData.email, value: e.target.value } });
		setMessage({ state: "", message: "" });
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData({ ...inputData, password: { ...inputData.password, value: e.target.value } });
		setMessage({ state: "", message: "" });
	};

	const refetchQueryUser = () => {
		if (storeLogin.token) {
			queryUser.refetch();
		}
	};

	const handleOnClickLogin = async () => {
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
			storeLogin.setData(mutateResult.token, mutateResult.role);
			queryUser.refetch();
		} else {
			storeLogin.setData("", "guest");
			setMessage({ state: "error", message: "Invalid name or password" });
		}
	};

	const handleOnClickLogout = async () => {
		setMessage({ state: "idle", message: "" });

		setIsLoading(true);
		const mutateResult = await mutateLogout({ token: storeLogin.token });
		setIsLoading(false);

		storeLogin.setData("", "guest");
		setInputData({ ...inputData, email: { ...inputData.email, value: "", disabled: false }, password: { ...inputData.password, value: "", disabled: false } });

		if (mutateResult.error !== 0) {
			setMessage({ state: "error", message: "An error has occured while logout" });
		}
	};

	const handleGoogleLogin = () => {
		performGoogleLogin();
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

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { QueryResult } from "./Query.types";
import { format } from "date-fns";

type LoginProps = {
	email: string;
	password: string;
};

type LoginResult = QueryResult<{
	auth_mode: string;
	current_account_id: string;
	email: string;
	id: string;
	name: string;
	permissions: string[];
	product_type: string;
	production: boolean;
	role: string;
	user_id: number;
}>;

const sendLogin = async (email: string, password: string): Promise<LoginResult> => {
	let result: LoginResult;

	try {
		const response = await fetch("https://app-sm.k8s-gh.sm-qa.qa.redislabs.com/api/v1/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				auth_mode: "direct",
				origin: "https://app-sm.k8s-gh.sm-qa.qa.redislabs.com/#",
				password: password,
				username: email,
				utm_campaign: "/",
				utm_content: "",
				utm_landing_page: "https://app-sm.k8s-gh.sm-qa.qa.redislabs.com/",
				utm_medium: "direct",
				utm_referrer: "",
				utm_source: "direct",
				utm_term: "",
				utm_timestamp: format(new Date(), "M/d/yyyy H:mm:ss"),
			}),
		});

		if (response.ok) {
			const res = await response.json();

			result = {
				error: 0,
				message: "",
				response: res,
			};
		} else {
			result = {
				error: 2,
				message: "login error",
			};
		}
	} catch (error) {
		result = {
			error: 1,
			message: "login failed",
		};
	}

	return result;
};

const login = (options?: UseMutationOptions<LoginResult, Error, LoginProps, unknown>) => {
	const { mutateAsync } = useMutation({
		...options,
		mutationFn: (props: LoginProps) => sendLogin(props.email, props.password),
	});

	return mutateAsync;
};

export const QueryLogin = {
	login,
};

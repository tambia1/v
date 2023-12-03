import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface QueryType {
	error: number;
	message: string;
	data?: Object;
}

interface LoginProps {
	email: string;
	password: string;
}

const performLogin = (props: LoginProps, options?: Partial<UseQueryOptions<QueryType, Error>>) => {
	const query = useQuery({ queryKey: ["login"], queryFn: () => sendLogin(props.email, props.password), ...options });

	return query;
};

const sendLogin = async (email: string, password: string): Promise<QueryType> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	let error = 0;
	let message = "ok";

	if (email !== "a" || password !== "a") {
		error = 1;
		message = "email or password does not match";
	}

	return {
		error,
		message,
	};
};

const performLogout = (options?: Partial<UseQueryOptions<QueryType, Error>>) => {
	const query = useQuery({ queryKey: ["logout"], queryFn: () => sendLogout(), ...options });

	return query;
};

const sendLogout = async (): Promise<QueryType> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	let error = 0;
	let message = "ok";

	return {
		error,
		message,
	};
};

export const QueryLogin = {
	performLogin,
	performLogout,
};

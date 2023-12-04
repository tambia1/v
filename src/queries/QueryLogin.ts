import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QueryType } from "./Query.types";
import { sendLogin, sendLogout } from "./api";

export interface LoginType extends QueryType {
	token: string;
}

export interface LogoutType extends QueryType {}

interface LoginProps {
	email: string;
	password: string;
}

const performLogin = (props: LoginProps, options?: Partial<UseQueryOptions<LoginType, Error>>) => {
	return useQuery({ queryKey: ["login"], queryFn: () => sendLogin(props.email, props.password), ...options });
};

const performLogout = (options?: Partial<UseQueryOptions<QueryType, Error>>) => {
	return useQuery({ queryKey: ["logout"], queryFn: () => sendLogout(), ...options });
};

export const QueryLogin = {
	performLogin,
	performLogout,
};

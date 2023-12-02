import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface QueryType {
	error: number;
	message: string;
	data?: Object;
}

const performLogin = (options?: Partial<UseQueryOptions<QueryType, Error>>) => {
	const query = useQuery({ queryKey: ["login"], queryFn: getLogin, ...options });

	return query;
};

const getLogin = async (): Promise<QueryType> => {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return {
		error: Math.round(Math.random() * 1),
		message: "ok",
	};
};

export const QueryLogin = {
	performLogin,
};

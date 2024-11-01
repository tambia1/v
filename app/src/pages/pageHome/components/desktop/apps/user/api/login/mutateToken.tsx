import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import { sendToken } from "../Api.services";
import type { QueryResult } from "../Api.types";

type MutateTokenProps = {
	token: string;
};

export type MutateTokenResult = QueryResult & {};

export const mutateToken = (options?: UseMutationOptions<MutateTokenResult, Error, MutateTokenProps, unknown>) => {
	const { mutateAsync } = useMutation({
		...options,
		mutationFn: (props: MutateTokenProps) => sendToken(props.token),
	});

	return mutateAsync;
};

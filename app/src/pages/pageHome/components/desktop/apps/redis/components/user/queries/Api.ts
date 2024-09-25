import { MutateLoginResult } from "./QueryLogin";

export const sendLogin = async (email: string, password: string): Promise<MutateLoginResult> => {
	const result: MutateLoginResult = {
		error: 0,
		message: "",
		token: "",
	};

	//send
	const userId = email + password;

	if (!userId) {
		result.error = 1;
		result.message = "invalid name or password";
	} else {
		const token = "token_" + Math.floor(Math.random() * 1_000_000);
		result.token = token;
	}

	return result;
};

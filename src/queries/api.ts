import { Promises } from "@src/services/Promises";
import { MutateLoginResult, MutateLogoutResult, QueryLoginResult } from "./QueryLogin";
import { QueryUserResult } from "./QueryUser";

const DELAY = 2000;

const dbUsers: { [userId in string]: { email: string; password: string; firstName: string; lastName: string } } = {
	user_1: {
		email: "a",
		password: "a",
		firstName: "John",
		lastName: "Doe",
	},
	user_2: {
		email: "b",
		password: "b",
		firstName: "Jane",
		lastName: "May",
	},
};

const dbTokens: { [token in string]: string } = {
	token_0: "user_0",
};

export const sendLogin = async (email: string, password: string): Promise<MutateLoginResult> => {
	await Promises.sleep(DELAY);

	const userId = Object.keys(dbUsers).find((userId) => dbUsers[userId].email === email && dbUsers[userId].password === password);

	const result: MutateLoginResult = {
		error: 0,
		message: "",
		token: "",
	};

	if (!userId) {
		result.error = 1;
		result.message = "invalid name or password";
		result.token = "";
	} else {
		const token = "token_" + Math.floor(Math.random() * 1_000_000);

		dbTokens[token] = userId;
		result.token = token;
	}

	return result;
};

export const sendLogout = async (token: string): Promise<MutateLogoutResult> => {
	await Promises.sleep(DELAY);

	const result: MutateLogoutResult = {
		error: 0,
		message: "",
	};

	if (!dbTokens[token]) {
		result.error = 1;
		result.message = "invalid token";
	} else {
		delete dbTokens[token];
	}

	return result;
};

export const getLogin = async (token: string): Promise<QueryLoginResult> => {
	await Promises.sleep(DELAY);

	const result: QueryLoginResult = {
		error: 0,
		message: "",
		token: token,
	};

	if (token !== "12345") {
		result.error = 1;
		result.message = "invalid token";
		result.token = "";
	}

	return result;
};

export const getUser = async (token: string): Promise<QueryUserResult> => {
	await Promises.sleep(DELAY);

	const result: QueryUserResult = {
		error: 0,
		message: "",
		firstName: "",
		lastName: "",
		email: "",
	};

	if (!token) {
		result.error = 1;
		result.message = "token is empty";
	} else if (!dbTokens[token]) {
		result.error = 2;
		result.message = "unauthorized";
	} else if (!dbUsers[dbTokens[token]]) {
		result.error = 3;
		result.message = "user not found";
	} else {
		const userId = dbTokens[token];

		result.firstName = dbUsers[userId].firstName;
		result.lastName = dbUsers[userId].lastName;
		result.email = dbUsers[userId].email;
	}

	return result;
};
